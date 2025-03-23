import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated: boolean = false; 
  isOnColeccionPage: boolean = false; 

  constructor(private router: Router) {
    this.isAuthenticated = localStorage.getItem('token') !== null;
    
    this.isOnColeccionPage = this.router.url.includes('/coleccion');
  }

  agregarJuego() {
    console.log('Agregar Juego');
  }
}
