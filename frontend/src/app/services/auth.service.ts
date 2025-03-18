// filepath: /Proyecto2/frontend/src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Cambia esto a la URL de tu API
  constructor(private http: HttpClient) {}

  registro(user: { nombreUsuario: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, user);
  }
}