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
    unreadNotificationsCount: number = 0;
    showNotificationsList: boolean = false;
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
            if(notifications.length === 0)
                this.notifications = [{mensaje: "No hay notificaciones nuevas", leido: true}]
            else{
                this.notifications = notifications;
                this.unreadNotificationsCount = notifications.filter(n => !n.leido).length;
            } 
        });
    }

    showNotifications() {
        this.showNotificationsList = !this.showNotificationsList;
        this.notifications.forEach(notification => {
            console.log(notification.mensaje);
        })
    }

    markAsRead(notificationId: number) {
        this.notificacionService.markAsRead(notificationId).subscribe(() => {
            this.loadNotifications();
        });
    }

    destroyNotification(id: number): void {
        console.log(id);
        this.notificacionService.destroyNotification(id).subscribe(
          response => {
            console.log('Notificación eliminada:', response);
            this.notifications = this.notifications.filter(n => n.id !== id);
          },
          error => {
            console.error('Error al eliminar la notificación:', error);
          }
        );
        this.loadNotifications();
    }

    toggleNotifications() {
        this.notificationsVisible = !this.notificationsVisible;
        if (this.notificationsVisible) {
          this.loadNotifications();
        }
    }
}
