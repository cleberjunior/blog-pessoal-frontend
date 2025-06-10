import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/login';
  private tokenKey = 'token';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.apiUrl, {
      email,
      senha
    }).pipe(
      map((tokenResponse) => {
        const token = tokenResponse.token;
        if (token) {
          console.log('Token: ', token);
          localStorage.setItem(this.tokenKey, token);
          return ({ success: true, token, user: { email }}); 
        }

        return ({ success: false });
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
