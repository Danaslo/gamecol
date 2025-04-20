import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = 'http://172.18.1.3';

  constructor(private http: HttpClient) { }

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

  cambiarEstado(idJuego: BigInt): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer $(token)');
    return this.http.post(`${this.apiUrl}/cambiarVenta`, { idJuego }, { headers });
  }



  listarEnVenta(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(this.http.get(`${this.apiUrl}//listarEnVenta`, { headers }));
    return this.http.get(`${this.apiUrl}/listarEnVenta`, { headers });
  }

  buscarPorFiltro(filtros: any): Observable<any> {
    let params = new HttpParams();

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    if (filtros.nombre) {
      params = params.set('nombre', filtros.nombre);
    }
    if (filtros.plataforma) {
      params = params.set('plataforma', filtros.plataforma);
    }
    if (filtros.condicion) {
      params = params.set('condicion', filtros.condicion);
    }
    if (filtros.precioMin) {
      params = params.set('precioMin', filtros.precioMin.toString());
    }
    if (filtros.precioMax) {
      params = params.set('precioMax', filtros.precioMax.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/listarPorParametro`, { headers, params });
  }

  crearSeguimiento(idJuego: BigInt): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/crearSeguimiento`, { idJuego }, { headers });
  }

  listarSeguimientos(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/listarSeguimientos`, { headers });
  }

  borrarSeguimiento(idJuego: BigInt): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/borrarSeguimiento`, { idJuego }, { headers });
  }

}
