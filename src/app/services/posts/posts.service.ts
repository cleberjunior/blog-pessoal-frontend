import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPostService } from './iposts.service';
import { SavePostRequest, SavePostResponse, UpdatePostRequest, UpdatePostResponse, ListPostResponse, DetailPostResponse } from './posts.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService implements IPostService {

  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: SavePostRequest): Observable<SavePostResponse> {
    return this.http.post<SavePostResponse>(`${this.basePath}/api/postagens`, request);
  }

  update(id:number, request: UpdatePostRequest): Observable<UpdatePostResponse> {
    return this.http.put<UpdatePostResponse>(`${this.basePath}/api/postagens/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/api/postagens/${id}`);
  }

  list(): Observable<ListPostResponse[]> {
    return this.http.get<ListPostResponse[]>(`${this.basePath}/api/postagens`);
  }

  findById(id: number): Observable<DetailPostResponse> {
    return this.http.get<DetailPostResponse>(`${this.basePath}/api/postagens/${id}`);
  }
}
