import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule,RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    isLoggedIn: boolean = false;
    isAuthenticated: boolean = false;
    menuOpen: boolean = false;
    rutaActual: string = '';
    isAdmin: boolean = false;

    constructor(private router: Router, private authService: AuthService) {
        this.checkAuthStatus();
        this.router.events.subscribe(() => {
            this.rutaActual = this.router.url;
          });
    }

    ngOnInit() {
        this.checkIfAdmin();
    }



    checkAuthStatus() {
        this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
        this.isAuthenticated = localStorage.getItem('token') !== null;
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }

    login() {
        localStorage.setItem('isLoggedIn', 'true');
        this.checkAuthStatus();
    }

    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        this.checkAuthStatus();
        this.router.navigate(['/login']);
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    checkIfAdmin() {
        this.authService.isAdmin().subscribe({
          next: (res) => {
            this.isAdmin = res.admin;
          },
          error: (err) => {
            console.error('Error al verificar rol de usuario:', err);
          }
        });
      }



}
