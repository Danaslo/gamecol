import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://172.18.1.3';

  constructor(private http: HttpClient) { }

  getUserName(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userName = this.http.get(`${this.apiUrl}/userName`, { headers });
    return userName;
  }

  editPassword(nuevaContrasenia: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/editPassword`, { nuevaContrasenia }, { headers });
  }

  editPhone(newPhone: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/editPhone`, { newPhone }, { headers });
  }

  editEmail(newEmail: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/editEmail`, { newEmail }, { headers });
  }
}
