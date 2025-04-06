import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
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

  





  /*
  venderJuego(idJuego: BigInt): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  }
*/



  //Simplemente para probar que llegue aquí
  venderJuego(idJuego: BigInt) {
    console.log('Patata' + idJuego);
  }
}
