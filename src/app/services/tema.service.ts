import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tema } from '../models/tema.models';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.apiUrl}/api/temas`);
  }

  getTemaById(id: number): Observable<Tema> {
    const tema = this.http.get<Tema>(`${this.apiUrl}/api/temas/${id}`);
    return tema;
  }
}
