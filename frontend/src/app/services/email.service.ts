import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = import.meta.env.VITE_API_URL;

  constructor(private http: HttpClient) { }

  enviarCorreo(to: string, subject: string, message: string): Observable<any> {
    const body = { to, subject, message };
    return this.http.post<any>(`${this.apiUrl}/contacto`, body);
  }
}
