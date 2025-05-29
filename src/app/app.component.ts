import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AngularMaterialModule } from './components/commons/angular-material/angular-material.module';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLinkActive, 
    AngularMaterialModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Blog Pessoal';

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router, 
  ) {}

  logout(): void {
    this.authService.logout();
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  navigateTo(path: string) {
    this.router.navigate([path])
  }
}
