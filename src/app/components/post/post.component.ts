import { Component } from '@angular/core';
import {Post} from "../../models/post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
    posts: Post[] = [];

    constructor() {}

    ngOnInit(): void {}
}
