import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() addPost: EventEmitter<Post> = new EventEmitter();
  private mode = 'create';
  private postId!: string | null;

  constructor(private postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId!);
      } else {
        this.mode = 'edit';
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
    if (this.mode === 'create') {
      this.addPost.emit(post);
    } else {
      this.postService.updatePost(post);
    }
    form.resetForm();
  }
}
