import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/_models/post.model';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss'],
})
export class PostsCreateComponent implements OnInit {
  postTitle!: string;
  postContent!: string;
  post: any;
  form!: FormGroup;
  imagePreview!: string;
  private mode = 'create';
  private postId!: string;

  constructor(private postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId')!;
        this.postService.getPost(this.postId!).subscribe((post) => {
          this.post = post;
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
          });
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  onImagePicked(event: Event) {
    // @ts-ignore: Object is possibly 'null'.
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) return;

    const post: Post = {
      id: this.postId ? this.postId : '',
      title: this.form.value.title,
      content: this.form.value.content,
      imagePath: '',
    };

    if (this.mode === 'create') {
      this.postService.addPost(post, this.form.value.image);
    } else {
      this.postService.updatePost(post, this.form.value.image);
    }
    this.form.reset();
  }
}
