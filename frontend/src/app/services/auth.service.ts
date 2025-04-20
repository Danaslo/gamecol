import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://172.18.1.3';

  constructor(private http: HttpClient) { }

  registro(user: { nombreUsuario: string; email: string; password: string, telefono: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, user);
  }

  login(credentials: { nombreUsuario: string; password: string }): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${this.apiUrl}/login`, credentials).subscribe({
        next: (response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('isLoggedIn', 'true');
          }
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isAdmin(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/isAdmin`, { headers });
  }
}
