import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Array<any> = [
    // { title: 'First Post', content: "This is post 1's content" },
    // { title: 'Second Post', content: "This is post 2's content" },
    // { title: 'Third Post', content: "This is post 3's content" },
  ];

  constructor() {}

  ngOnInit(): void {}
}
