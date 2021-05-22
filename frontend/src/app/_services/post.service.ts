import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Post } from '../_models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [
    { title: 'First Post', content: "This is post 1's content" },
    { title: 'Second Post', content: "This is post 2's content" },
    { title: 'Third Post', content: "This is post 3's content" },
  ];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(): void {
    this.http
      .get<Post[]>('http://localhost:5000/api/posts')
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
