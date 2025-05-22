import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly httpClient = inject(HttpClient);

  login(email: string, senha: string): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>('http://localhost:8080/login', {
      email,
      senha
    }).pipe(
      map((tokenResponse) => {
        localStorage.setItem('token', tokenResponse.token);
        
        return tokenResponse;
      })
    );
  }
}
