import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../pages/register/users/models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Sua URL do backend
  private readonly API = 'http://localhost:8080/register/users';

  constructor(private http: HttpClient) { }

  register(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.API}/create`, usuario);
  }

  consultUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.API}/users`);
  }

  inativeUser(id: number): Observable<void>{
    return this.http.put<void>(`${this.API}/inactivate/${id}`, {});
  }
}