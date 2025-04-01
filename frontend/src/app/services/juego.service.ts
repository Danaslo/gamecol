import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = 'http://172.18.1.3'; 

  constructor(private http: HttpClient) {}

  agregarJuego(juego: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/agregarJuego`, juego, { headers });
  }

  listarJuegos(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(this.http.get(`${this.apiUrl}/listarJuegos`, { headers }));
    return this.http.get(`${this.apiUrl}/listarJuegos`, { headers });
  }

  borrarJuego(idJuego: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/borrarJuego`, { idJuego }, { headers });
  }
}
