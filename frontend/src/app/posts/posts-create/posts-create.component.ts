import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/_models/post.model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss'],
})
export class PostsCreateComponent implements OnInit {
  postTitle!: string;
  postContent!: string;
  @Output() addPost: EventEmitter<Post> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onAddPost() {
    const post: Post = {
      title: this.postTitle,
      content: this.postContent,
    };
    this.addPost.emit(post);
  }
}
