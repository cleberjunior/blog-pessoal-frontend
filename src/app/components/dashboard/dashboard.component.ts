import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../commons/angular-material/angular-material.module';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/posts.models';

interface AuthorStats {
    name: string;
    count: number;
    percentage: number;
  }
  
  interface DashboardStats {
    totalPosts: number;
    totalAuthors: number;
    latestPosts: Post[];
    postsByAuthor: AuthorStats[];
    monthlyPosts: { month: string; count: number }[];
  }

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, AngularMaterialModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    title = 'Blog Pessoal';
    
    stats: DashboardStats = {
      totalPosts: 0,
      totalAuthors: 0,
      latestPosts: [],
      postsByAuthor: [],
      monthlyPosts: []
    };
  
    // Configurações do gráfico
    chartData: any[] = [];
    chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Posts por Autor'
        }
      }
    };
  
    constructor(private postService: PostService) { }
  
    ngOnInit(): void {
      this.loadDashboardData();
    }
  
    loadDashboardData(): void {
      this.postService.getAllPosts().subscribe({
        next: (posts) => {
          this.calculateStats(posts);
          this.prepareChartData();
        },
        error: (error) => {
          console.error('Erro ao carregar dados do dashboard:', error);
        }
      });
    }
  
    private calculateStats(posts: Post[]): void {
      // Total de posts
      this.stats.totalPosts = posts.length;
  
      // Posts por autor
      const authorCounts = this.groupPostsByAuthor(posts);
      this.stats.totalAuthors = Object.keys(authorCounts).length;
      
      this.stats.postsByAuthor = Object.entries(authorCounts).map(([name, count]) => ({
        name,
        count: count as number,
        percentage: Math.round((count as number / posts.length) * 100)
      }));
  
      // Últimos posts (5 mais recentes)
      this.stats.latestPosts = posts
        .sort((a, b) => {
          if (a.criadoEm && b.criadoEm) {
            return new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime();
          }
          return 0;
        })
        .slice(0, 5);
  
      // Posts por mês
      //this.stats.monthlyPosts = this.getMonthlyStats(posts);
      // Posts por tema (simulando estatísticas mensais)
      this.stats.monthlyPosts = this.getThemeStats(posts);
    }
  
    groupPostsByAuthor(posts: Post[]): { [key: string]: number } {
      return posts.reduce((acc, post) => {
        acc[post.autor] = (acc[post.autor] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
    }

    private getThemeStats(posts: Post[]): { month: string; count: number }[] {
      const themeCounts: { [key: string]: number } = {};
      
      posts.forEach(post => {
        const themeKey = `Tema ${post.temaId}`;
        themeCounts[themeKey] = (themeCounts[themeKey] || 0) + 1;
      });
  
      return Object.entries(themeCounts)
        .map(([theme, count]) => ({
          month: theme, // Usando 'month' para manter compatibilidade com o template
          count
        }));
    }
  
    /*private getMonthlyStats(posts: Post[]): { month: string; count: number }[] {
      const monthCounts: { [key: string]: number } = {};
      
      posts.forEach(post => {
        const date = new Date(post.data);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
      });
  
      return Object.entries(monthCounts)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, count]) => ({
          month: this.formatMonth(month),
          count
        }));
    }
  
    private formatMonth(monthKey: string): string {
      const [year, month] = monthKey.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
    }*/

    private formatMonth(monthKey: string): string {
      return monthKey; // Retorna o nome do tema diretamente
    }
  
    private prepareChartData(): void {
      this.chartData = [
        {
          data: this.stats.postsByAuthor.map(author => author.count),
          label: 'Posts por Autor',
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ]
        }
      ];
    }
}
