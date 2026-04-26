import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL da sua API (ex: Spring Boot rodando no 8080)
  private readonly API_URL = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.API_URL, credentials).pipe(
      tap(response => {
        // Se a API retornar um objeto com o token (ex: { token: '...' })
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  // Métodos auxiliares que o mercado usa
  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
