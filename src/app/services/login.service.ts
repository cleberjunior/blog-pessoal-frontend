import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl + '/login';
  private readonly httpClient = inject(HttpClient);

  login(email: string, senha: string): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(this.apiUrl, {
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
