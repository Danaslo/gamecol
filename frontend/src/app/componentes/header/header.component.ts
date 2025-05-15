import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notificacion.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    isLoggedIn: boolean = false;
    isAuthenticated: boolean = false;
    menuOpen: boolean = false;
    rutaActual: string = '';
    isAdmin: boolean = false;
    notifications: any[] = [];
    notificationsVisible: boolean = false;
    username: string = "";

    constructor(private router: Router, private authService: AuthService, private notificacionService: NotificationService) {
        this.checkAuthStatus();
        this.router.events.subscribe(() => {
            this.rutaActual = this.router.url;
        });
    }

    ngOnInit() {
        this.checkIfAdmin();
        this.loadNotifications();
        this.getUserName();
    }

    getUserName() {
        this.authService.getUser().subscribe((res) => {
            this.username = res.nombreUsuario;
        }, (err) => {
            console.error('Error al obtener el nombre de usuario:', err);
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

    loadNotifications() {
        this.notificacionService.getNotifications().subscribe((notifications: any[]) => {
            this.notifications = notifications;
        });
    }

    destroyNotification(id: number): void {
        this.notificacionService.destroyNotification(id).subscribe(
            response => {
                console.log('Notificación eliminada:', response);
    
                this.loadNotificationsSilently();
    
            },
            error => {
                console.error('Error al eliminar la notificación:', error);
            }
        );
    }

    loadNotificationsSilently() {
        this.notificacionService.getNotifications().subscribe((notifications: any[]) => {
            this.notifications = notifications;
    
            if (this.notifications.length === 0) {
                this.notificationsVisible = false;
            }
        });
    }


    toggleNotifications() {
        if(this.notifications.length > 0)
            this.notificationsVisible = !this.notificationsVisible;
        else
            this.notificationsVisible = false;
    }
}
