import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../_models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(): void {
    this.http
      .get<any>('http://localhost:5000/api/posts')
      .pipe(
        map((postData) =>
          postData.map((post: { title: any; content: any; _id: any }) => ({
            title: post.title,
            content: post.content,
            id: post._id,
          }))
        )
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.http
      .post<{ message: string; recieved: Post }>(
        'http://localhost:5000/api/posts',
        post
        // {observe: 'response'}
      )
      .subscribe((response) => {
        console.log(response.message);
        console.log(response.recieved);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete(`http://localhost:5000/api/posts/${postId}`)
      .subscribe(() => console.log('deleted'));
  }
}
