import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, HttpClientModule, HeaderComponent, CommonModule, FooterComponent], 
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
}) 
export class RegistroComponent {
  nombreUsuario: string = '';
  email: string = '';
  password: string = '';
  telefono: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.nombreUsuario && this.email && this.password && this.telefono) {
      this.authService.registro({ nombreUsuario: this.nombreUsuario, email: this.email, password: this.password, telefono: this.telefono })
        .subscribe(
          (response) => {
            console.log('Usuario registrado:', response);
            this.router.navigate(['/']); 
          },
          (error) => {
            console.error('Error al registrar usuario', error);
          }
        );
    } else {
      console.log('Formulario inválido');
    }
  }
}
//