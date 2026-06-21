import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsReceivableService {
  private apiUrl = 'http://localhost:8080/financial/receivables'; 

  constructor(private http: HttpClient) {}

  // Cria o cabeçalho padrão com o token JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Método de cadastro original
  create(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, data, { headers });
  }

  // Busca os títulos pendentes
  getPendingCollections(startDate: string, endDate: string, customerId: any): Observable<any> {
    const headers = this.getHeaders();
    
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    // Adiciona o customerId apenas se ele tiver algum valor selecionado
    if (customerId) {
      params = params.set('customerId', customerId);
    }

    return this.http.get<any>(`${this.apiUrl}/pendding-collections`, { headers, params });
  }
}