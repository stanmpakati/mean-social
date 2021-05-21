import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../_models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: Post[] = [
    { title: 'First Post', content: "This is post 1's content" },
    { title: 'Second Post', content: "This is post 2's content" },
    { title: 'Third Post', content: "This is post 3's content" },
  ];

  constructor() {}

  getPosts(): Observable<Post[]> {
    return of(this.posts);
  }

  addPost(post: Post) {
    this.posts.push(post);
  }
}
