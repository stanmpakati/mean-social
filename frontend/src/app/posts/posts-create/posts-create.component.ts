import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  onAddPost(form: NgForm) {
    if (form.invalid) return;

    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    };
    this.addPost.emit(post);
    form.resetForm();
  }
}
