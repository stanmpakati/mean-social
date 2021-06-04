import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/_models/post.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() posts!: Post[];
  @Input() totalPosts!: number;
  @Output() onDeletePost = new EventEmitter<string>();
  @Output() onChangePage = new EventEmitter<{
    postsPerPage: number;
    currentPage: number;
  }>();
  postsperPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  isAuthenticated!: boolean;
  isAuthSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
    this.isAuthenticated = this.authService.getIsAuthenticated();
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.onDeletePost.emit(postId);
  }

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsperPage = pageData.pageSize;

    this.onChangePage.emit({
      postsPerPage: this.postsperPage,
      currentPage: this.currentPage,
    });
  }
}
