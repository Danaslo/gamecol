import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://172.18.1.3';

  constructor(private http: HttpClient) {}

  crearNotificacion(mensaje: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/notificaciones`, { mensaje }, { headers });
  }

  getNotifications(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const notificaciones = this.http.get(`${this.apiUrl}/notificaciones`, { headers });
    return notificaciones;
  }

  markAsRead(notificationId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/notificaciones/cambiarEstado`,{notificationId},{headers});
  }
}
