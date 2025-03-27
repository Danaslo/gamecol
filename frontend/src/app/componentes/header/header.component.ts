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
    isLoggedIn: boolean = false;
    isAuthenticated: boolean = false;
    menuOpen: boolean = false;

    constructor(private router: Router) {
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
        this.isAuthenticated = localStorage.getItem('token') !== null;
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
