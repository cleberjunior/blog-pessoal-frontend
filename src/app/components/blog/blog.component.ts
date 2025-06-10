import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../commons/angular-material/angular-material.module';
import { Post, PostsPorTema } from '../../models/posts.models';
import { BlogService } from '../../services/blog.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  postsPorTema: PostsPorTema[] = [];
  loading = false;
  error = '';
  totalPosts = 0;
  totalTemas = 0;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.carregarPosts();
  }

  carregarPosts(): void {
    this.loading = true;
    this.error = '';

    this.blogService.getPostsPorTema().subscribe({
      next: (data) => {
        this.postsPorTema = data;
        this.totalPosts = data.reduce((total, grupo) => total + grupo.posts.length, 0);
        this.totalTemas = data.length;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar os posts. Tente novamente.';
        this.loading = false;
        console.error('Erro ao carregar posts:', error);
      }
    });
  }

  formatarData(data: Date | undefined): string {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  getTruncatedContent(conteudo: string, maxLength: number = 150): string {
    if (conteudo.length <= maxLength) {
      return conteudo;
    }
    return conteudo.substring(0, maxLength) + '...';
  }

  scrollToTema(temaId: number): void {
    const elemento = document.getElementById(`tema-${temaId}`);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trackByTema(index: number, item: PostsPorTema): number {
    return item.tema.id;
  }

  trackByPost(index: number, item: Post): number {
    return item.id;
  }
}
