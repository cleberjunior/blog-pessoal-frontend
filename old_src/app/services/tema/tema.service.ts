import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITemaService } from './itema.service';
import { SaveTemaRequest, SaveTemaResponse, UpdateTemaRequest, UpdateTemaResponse, ListTemaResponse, DetailTemaResponse } from './tema.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemaService implements ITemaService {

  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: SaveTemaRequest): Observable<SaveTemaResponse> {
    return this.http.post<SaveTemaResponse>(`${this.basePath}/api/temas`, request);
  }

  update(id:number, request: UpdateTemaRequest): Observable<UpdateTemaResponse> {
    return this.http.put<UpdateTemaResponse>(`${this.basePath}/api/temas/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/api/temas/${id}`);
  }

  list(): Observable<ListTemaResponse[]> {
    return this.http.get<ListTemaResponse[]>(`${this.basePath}/api/temas`);
  }

  findById(id: number): Observable<DetailTemaResponse> {
    return this.http.get<DetailTemaResponse>(`${this.basePath}/api/temas/${id}`);
  }
}
