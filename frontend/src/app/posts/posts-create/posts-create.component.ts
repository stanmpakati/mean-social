import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  private mode = 'create';
  private postId!: string;

  constructor(private postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId')!;
        this.postService.getPost(this.postId!).subscribe((post) => {
          this.post = post;
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) return;

    const post: Post = {
      id: this.postId ? this.postId : '',
      title: form.value.title,
      content: form.value.content,
    };
    console.log(this.mode);
    if (this.mode === 'create') {
      this.postService.addPost(post);
    } else {
      console.log('editing');
      this.postService.updatePost(post);
    }
    form.resetForm();
  }
}
