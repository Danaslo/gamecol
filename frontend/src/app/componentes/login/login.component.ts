import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HeaderComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    this.authService.login({ nombreUsuario: this.username, password: this.password }).subscribe({
      next: (response) => {
        alert('Inicio de sesión exitoso.');
        this.router.navigate(['/coleccion']);
      },
      error: (err) => {
        alert('Error en el inicio de sesión: ' + err.error.message);
      }
    });
  }
}