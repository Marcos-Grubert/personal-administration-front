import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ajuste a URL se o seu Spring Boot estiver em outra porta ou rota
  private readonly API = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(this.API, loginData).pipe(
      tap(res => {
        // Guarda o token no navegador para as próximas chamadas
        if (res.token) {
          localStorage.setItem('access_token', res.token);
        }
      })
    );
  }
}
