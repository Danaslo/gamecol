import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isAdmin: boolean = false;
  userList: any[] = [];

  constructor(private router: Router, private authService: AuthService, private adminService: AdminServiceService) { }

  ngOnInit() {
    this.checkIfAdmin();
    this.listarUsusarios();
  }


  checkIfAdmin() {
    this.authService.isAdmin().subscribe({
      next: (res) => {
        this.isAdmin = res.admin;
      }
    });
  }

  listarUsusarios() {
    this.adminService.getUsuarios().subscribe({
      next: (res) => {
        this.userList = res.usuarios;
      },
      error: (err) => {
        console.error('Error al listar usuarios:');
      }
    });
  }

  borrarUsuario(userId: BigInt){
    this.adminService.borrarUsuario(userId).subscribe({
      next: (res) => {
        this.listarUsusarios();
      },
      error: (err) => {
        console.error('Error al borrar usuario:');
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
