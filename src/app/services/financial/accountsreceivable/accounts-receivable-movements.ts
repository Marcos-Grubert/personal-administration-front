import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceivableMovementService {
  // A URL base agora reflete o caminho dos movimentos
  private baseUrl = 'http://localhost:8080/financial/receivables/movements'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Cria um movimento único (Baseado no seu exemplo do Postman)
  create(payload: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/create`, payload, { headers });
  }

  // Processa o lote (Ajuste a URL conforme o que você definir no Controller)
  bulkCreate(payload: any[]): Observable<any> {
    const headers = this.getHeaders();
    // Exemplo: /financial/receivables/movements/bulk-create
    return this.http.post<any>(`${this.baseUrl}/bulk-create`, payload, { headers });
  }
}