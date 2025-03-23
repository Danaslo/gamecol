import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //Variable para ver si se está logueado y que no salga el maldito botón.  
  isLoggedIn: boolean;
  
    constructor() {
      // Lée el estado del login desde localStorage
      this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
    }
  
    // Función de login
    login() {
      this.isLoggedIn = true;
      // Guardar el estado en localStorage
      localStorage.setItem('isLoggedIn', 'true');
    }
  
    // Función de logout
    logout() {
      this.isLoggedIn = false;
      // Limpiar el estado de login en localStorage
      localStorage.setItem('isLoggedIn', 'false');
    }
}
