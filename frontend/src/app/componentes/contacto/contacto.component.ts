import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  asunto: string = '';
  mensaje: string = '';
  exito: string = '';
  fallo: string = '';

  constructor(private emailService: EmailService) { }

  enviarCorreo() {
    if (!this.asunto || !this.mensaje) {
      this.fallo = 'Por favor, completa todos los campos.';
      return;
    }
    const destinatario = 'ad.gamer.cave@gmail.com';
    this.emailService.enviarCorreo(destinatario, this.asunto, this.mensaje)
      .subscribe({
        next: (response) => {
          this.exito = 'Correo enviado con éxito';
          this.fallo = ''; 
          this.asunto = '';
          this.mensaje = '';
        },
        error: (err) => {
          this.fallo = 'Hemos tenido un problema al enviar el correo.';
          this.exito = '';
          console.error(err);
        }
      });
  }
}
