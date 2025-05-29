import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../commons/angular-material/angular-material.module';
import { Post } from '../../models/posts.models';
import { BlogService } from '../../services/blog.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {

  posts: Post[] = [];
  loading = true;

  //constructor(private blogService: BlogService) {}
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    // Simular loading
    setTimeout(() => {
      this.postService.getAllPosts().subscribe(posts => {
        this.posts = posts;
        console.log(posts);
        this.loading = false;
      });
    }, 1000);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  }
}
