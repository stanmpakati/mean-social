import { Component, OnInit } from '@angular/core';
import { Post } from '../_models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onAddPost(post: Post) {
    // posts
  }
}
