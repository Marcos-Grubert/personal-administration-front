import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = "https://personal-administration.onrender.com/register/costumers/";

  constructor(private http: HttpClient){}

  searchCustomersForTerm(term: string){
    // Recupera o token usando a chave exata que o seu AuthService gravou
    const token = localStorage.getItem('auth_token'); 

    // Monta o cabeçalho esperado pelo Spring Security
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Envia a requisição contendo os headers de autenticação
    return this.http.get<any[]>(`${this.apiUrl}read?term=${term}`, { headers });
  }
}