import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/posts.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/api/postagens`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/api/postagens/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/api/postagens`, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/api/postagens/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/postagens/${id}`);
  }

  searchPosts(searchTerm: string): Observable<Post[]> {
    const filtered = this.getAllPosts()
      .pipe(
        map(posts => posts.filter(post => 
          post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.conteudo.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    return filtered;
  }

  getPostsByAuthor(autor: string): Observable<Post[]> {
    return this.getAllPosts()
      .pipe(
        map(posts => posts.filter(post => post.autor.toLowerCase().includes(autor.toLowerCase())))
      );
  }
}
