import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { VentaService } from '../../services/venta.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventas',
  standalone:true,
  imports: [HeaderComponent,FooterComponent, CommonModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit{
    ventas: any[] = [];  
    constructor(private ventaService: VentaService) {}
  
    ngOnInit(): void {
      this.obtenerVentas();  
    }
  
    obtenerVentas(): void {
      this.ventaService.obtenerVentas().subscribe(
        (data) => {
          console.log(data);
          this.ventas = data;
        },
        (error) => {
          console.error('Error al obtener las ventas', error);
        }
      );
    }
  }

