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

  getPosts(postsPerPage: number, currentPage: number): void {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<any>(`http://localhost:5000/api/posts${queryParams}`)
      .pipe(
        map((postData) =>
          postData.map(
            (post: { title: any; content: any; _id: any; imagePath: any }) => ({
              title: post.title,
              content: post.content,
              imagePath: post.imagePath,
              id: post._id,
            })
          )
        )
      )
      .subscribe((posts) => {
        console.log(posts);
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<Post>(`http://localhost:5000/api/posts/${id}`);
  }

  addPost(post: Post, image: File) {
    const postData = new FormData();
    postData.append('id', post.id);
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);

    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:5000/api/posts',
        postData
        // {observe: 'response'}
      )
      .subscribe((response) => {
        console.log(response);
        this.posts.push(response.post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(post: Post, image: File | string) {
    let postData: FormData | Post;

    if (typeof image == 'object') {
      postData = new FormData();
      postData.append('id', post.id);
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', image, post.title);
    } else {
      postData = { ...post, imagePath: image };
    }

    this.http
      .patch(`http://localhost:5000/api/posts/${post.id}`, postData)
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
