import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularMaterialModule } from '../../commons/angular-material/angular-material.module';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/posts.models';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, FormsModule, DatePipe, SlicePipe],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchTerm: string = '';
  selectedAuthor: string = '';
  authors: string[] = [];
  displayedColumns: string[] = ['titulo', 'autor', 'data', 'actions'];

  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.filteredPosts = posts;
        this.authors = [...new Set(posts.map(p => p.autor))];
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar posts', 'Fechar', { duration: 3000 });
        console.error('Erro ao carregar posts:', error);
      }
    });
  }

  filterPosts(): void {
    this.filteredPosts = this.posts.filter(post => {
      const matchesSearch = !this.searchTerm || 
        post.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.conteudo.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesAuthor = !this.selectedAuthor || post.autor === this.selectedAuthor;
      
      return matchesSearch && matchesAuthor;
    });
  }

  addPost(): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '600px',
      data: { post: null, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.createPost(result).subscribe({
          next: () => {
            this.loadPosts();
            this.snackBar.open('Post criado com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('Erro ao criar post', 'Fechar', { duration: 3000 });
            console.error('Erro ao criar post:', error);
          }
        });
      }
    });
  }

  editPost(post: Post): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '600px',
      data: { post: { ...post }, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.updatePost(post.id, result).subscribe({
          next: () => {
            this.loadPosts();
            this.snackBar.open('Post atualizado com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('Erro ao atualizar post', 'Fechar', { duration: 3000 });
            console.error('Erro ao atualizar post:', error);
          }
        });
      }
    });
  }

  deletePost(post: Post): void {
    if (confirm(`Tem certeza que deseja excluir o post "${post.titulo}"?`)) {
      this.postService.deletePost(post.id).subscribe({
        next: () => {
          this.loadPosts();
          this.snackBar.open('Post excluído com sucesso!', 'Fechar', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Erro ao excluir post', 'Fechar', { duration: 3000 });
          console.error('Erro ao excluir post:', error);
        }
      });
    }
  }
}
