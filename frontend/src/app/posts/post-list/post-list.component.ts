import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from 'src/app/_models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() posts!: Post[];
  @Output() onDeletePost = new EventEmitter<string>();
  totalPosts = 10;
  postsperPage = 3;
  pageSizeOptions = [1, 2, 5, 10];

  constructor() {}

  ngOnInit(): void {}
  onDelete(postId: string) {
    this.onDeletePost.emit(postId);
  }

  onPageChange(pageData: PageEvent) {}
}
