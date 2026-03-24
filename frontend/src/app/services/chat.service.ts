import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private readonly API_URL = 'http://172.18.1.3';
  private readonly SOCKET_URL = 'http://172.18.1.3';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');

    this.socket = io(this.SOCKET_URL, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling'],
      withCredentials: true
    });
  }

  // Cargar los últimos 20 mensajes desde el backend por HTTP
  cargarMensajes(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.API_URL}/chat/mensajesGeneral`, { headers });
  }

  // Enviar mensaje por socket
  enviarMensaje(mensaje: any): void {
    this.socket.emit('mensaje', mensaje);
  }

  // Escuchar nuevos mensajes por socket
  recibirMensajes(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('mensaje', (data: any) => {
        observer.next(data);
      });
    });
  }
}
