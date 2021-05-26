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

  getPost(id: string) {
    return { ...this.posts.find((p) => p.id === id) };
  }

  addPost(post: Post) {
    console.log('adding');
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:5000/api/posts',
        post
        // {observe: 'response'}
      )
      .subscribe((response) => {
        console.log(response);
        const postId = response.postId;
        post.id = postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(post: Post) {
    console.log(` update: ${post}`);
    this.http
      .patch(`http://localhost:5000/api/posts/${post.id}`, post)
      .subscribe((response) => console.log(response));
  }

  deletePost(postId: string) {
    this.http
      .delete(`http://localhost:5000/api/posts/${postId}`)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
