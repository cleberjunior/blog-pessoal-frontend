import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/posts.models';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private posts: Post[] = [];

  private postsSubject = new BehaviorSubject<Post[]>(this.posts);

  constructor() {}

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  getPostById(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }
}

