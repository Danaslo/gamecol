import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean;
  isAuthenticated: boolean = false;

  constructor(private router: Router) {
    this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
    this.isAuthenticated = localStorage.getItem('token') !== null;
  }

  login() {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
  }


  logout() {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  agregarJuego() {
    console.log('Agregar Juego');
  }
}
