import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post, PostsPorTema } from '../models/posts.models';
import { Tema } from '../models/tema.models';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = environment.apiUrl;

  private mockTemas: Tema[] = [
    { id: 1, descricao: 'Tecnologia' },
    { id: 2, descricao: 'Programação' },
    { id: 3, descricao: 'Desenvolvimento Web' },
    { id: 4, descricao: 'Frontend' },
    { id: 5, descricao: 'Backend' }
  ];

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/api/postagens`);
  }

  getAllTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.apiUrl}/api/temas`);
  }

  getPostsPorTema(): Observable<PostsPorTema[]> {
    return this.getAllPosts().pipe(
      map(posts => {
        // Agrupa posts por tema
        const postsAgrupados = posts.reduce((acc, post) => {
          if (!acc[post.temaId]) {
            acc[post.temaId] = [];
          }
          acc[post.temaId].push(post);
          return acc;
        }, {} as { [key: number]: Post[] });

        // Cria array de PostsPorTema
        const resultado: PostsPorTema[] = [];
        
        this.mockTemas.forEach(tema => {
          if (postsAgrupados[tema.id]) {
            // Ordena posts por data (mais recentes primeiro)
            const postsOrdenados = postsAgrupados[tema.id].sort((a, b) => 
              new Date(b.criadoEm!).getTime() - new Date(a.criadoEm!).getTime()
            );
            
            resultado.push({
              tema,
              posts: postsOrdenados
            });
          }
        });

        // Ordena temas por número de posts (decrescente)
        return resultado.sort((a, b) => b.posts.length - a.posts.length);
      })
    );
  }

  getTemaById(id: number): Tema | undefined {
    return this.mockTemas.find(tema => tema.id === id);
  }
}
