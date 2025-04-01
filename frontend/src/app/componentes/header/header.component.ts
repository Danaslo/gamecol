import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

    constructor(private router: Router) {
        this.checkAuthStatus();
        this.router.events.subscribe(() => {
            this.rutaActual = this.router.url;
          });
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
}
