import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { ICreatePostResponse, IPostRequest, IUpdatePostResponse } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class OtherService {
  private readonly httpClient = inject(HttpClient);
  private URL = 'http://localhost:8080/api/postagens';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.URL, {
      headers: this.getHeaders()
    });
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.URL}/${id}`, {
      headers: this.getHeaders()
    });
  }

  createPost(newPost: IPostRequest) {
    return this.httpClient.post<ICreatePostResponse>(this.URL, newPost, {
      headers: this.getHeaders()
    });
  }

  updatePost(id: number, post: IPostRequest) {
    return this.httpClient.put<IUpdatePostResponse>(`${this.URL}/${id}`, post, {
      headers: this.getHeaders()
    });
  }

  deletePost(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
