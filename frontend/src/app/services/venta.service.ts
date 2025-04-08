import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://172.18.1.3';

  constructor(private http: HttpClient) { }

  agregarVenta(juegoId: number, telefono: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { juegoId, telefono };
    console.log('Enviando al backend: ' + typeof(juegoId) + ' ' + telefono);
    return this.http.post(`${this.apiUrl}/vender`, body , { headers });
  }

  obtenerVentas(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    const url = `${this.apiUrl}/ventas`;
    return this.http.get<any>(url, { headers });
  }





}
