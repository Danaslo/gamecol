import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterOutlet, HttpClientModule],  // Asegúrate de incluir HttpClientModule en imports
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombreUsuario: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.nombreUsuario && this.email && this.password) {
      this.authService.registro({ nombreUsuario: this.nombreUsuario, email: this.email, password: this.password })
        .subscribe(
          (response) => {
            // Manejar la respuesta exitosa
            this.router.navigate(['/login']);
          },
          (error) => {
            // Manejar el error
            console.error('Error al registrar usuario', error);
          }
        );
    } else {
      console.log('Formulario inválido');
    }
  }
}
