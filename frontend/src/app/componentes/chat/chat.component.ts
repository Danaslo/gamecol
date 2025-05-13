import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
export class ChatComponent implements OnInit, AfterViewChecked {
  mensajes: any[] = [];
  mensajeTexto: string = '';
  usuarioId!: number;

  @ViewChild('mensajesContainer') private mensajesContainer!: ElementRef;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.setUsuarioDesdeToken();
    this.cargarMensajes();

    this.chatService.recibirMensajes().subscribe((msg) => {
      this.mensajes.push(msg);
      this.cargarMensajes();
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  enviarMensaje(): void {
    if (this.mensajeTexto.trim()) {
      const nuevoMensaje = {
        mensaje: this.mensajeTexto,
        id_usuario2: 9999,
        fecha_envio: new Date()
      };

      this.chatService.enviarMensaje(nuevoMensaje);
      this.mensajeTexto = '';
      this.cargarMensajes();
    }
  }

  cargarMensajes(): void {
    this.chatService.cargarMensajes().subscribe((mensajes) => {
      this.mensajes = mensajes;
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.mensajesContainer.nativeElement.scrollTop = this.mensajesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.warn('No se pudo hacer scroll automáticamente:', err);
    }
  }

  private setUsuarioDesdeToken(): void {
    const token = localStorage.getItem('token');
  }
}
