import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../_models/post.model';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  totalPosts!: number;
  postsSub!: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts(5, 1);

    this.postsSub = this.postService
      .getPostsListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  pageChange(pageData: { postsPerPage: number; currentPage: number }) {
    this.postService.getPosts(pageData.postsPerPage, pageData.currentPage);
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId);
  }
}
