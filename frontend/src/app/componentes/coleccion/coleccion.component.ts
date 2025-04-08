import { Component, OnInit, HostListener } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RegistroJuegoComponent } from '../registro-juego/registro-juego.component';
import { VentaService } from '../../services/venta.service';
import { stringify } from 'querystring';
import { VentaJuegoComponent } from '../venta-juego/venta-juego.component';
@Component({
  selector: 'app-coleccion',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule,RegistroJuegoComponent, VentaJuegoComponent],
  templateUrl: './coleccion.component.html',
  styleUrls: ['./coleccion.component.css']
})
export class ColeccionComponent implements OnInit {
  juegos: any[] = [];
  isModalOpen: boolean = false;
  isSellingModalOpen: boolean = false;
  juegoSeleccionadoId: number | null = null;

  constructor(private juegoService: JuegoService, private ventaService: VentaService) {}

  @HostListener('document:keydown', ['$event'])
  cerrarConEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isModalOpen) {
      this.closeModal();
    }
  }
  
  ngOnInit(): void {
    this.listarJuegos(); 
  }

  venderJuego(id:BigInt){

  }


  closeModal() {
    this.isModalOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
  }
  
  openSellingModal(juegoId: number) {
    this.juegoSeleccionadoId = juegoId;
    this.isSellingModalOpen = true;
  }
  
  closeSellingModal() {
    this.isSellingModalOpen = false;
    this.juegoSeleccionadoId = null;
  }

  listarJuegos() {
    this.juegoService.listarJuegos().subscribe(
      (data) => {
        this.juegos = data.juegos;
      },
      (error) => {
        console.error('Error al listar los juegos', error);
      }
    );
  }

  borrarJuego(idJuego: number) {
    this.juegoService.borrarJuego(idJuego).subscribe(
      () => {
        this.juegoService.listarJuegos(); 
      },
      (error) => {
        console.error('Error al borrar el juego', error);
      }
    );
  }
}
