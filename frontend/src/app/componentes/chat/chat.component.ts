import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensajes: any[] = [];
  mensajeTexto: string = '';
  usuarioId!: number;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.setUsuarioDesdeToken();

    this.cargarMensajes();


    this.chatService.recibirMensajes().subscribe((msg) => {
      this.mensajes.push(msg);
    });
  }

  enviarMensaje(): void {
    if (this.mensajeTexto.trim()) {
      const nuevoMensaje = {
        mensaje: this.mensajeTexto,
        id_usuario2: 9999, // Chat general
        fecha_envio: new Date()
      };
  
      this.chatService.enviarMensaje(nuevoMensaje);
      this.mensajeTexto = '';
      this.cargarMensajes();
    }
  }


  cargarMensajes(){
    this.chatService.cargarMensajes().subscribe((mensajes) => {
      this.mensajes = mensajes;
      console.log(mensajes[0]);
    });
  }

  private setUsuarioDesdeToken(): void {
    const token = localStorage.getItem('token');
  }
}
