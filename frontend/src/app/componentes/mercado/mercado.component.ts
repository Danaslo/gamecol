import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { JuegoService } from '../../services/juego.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mercado',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './mercado.component.html',
  styleUrl: './mercado.component.css'
})
export class MercadoComponent {

  juegos: any[] = [];
  isModalOpen: boolean = false;
  filtros = {
    nombre: '',
    plataforma: '',
    condicion: '',
    precioMin: null,
    precioMax: null
  };

  constructor(private juegoService: JuegoService) { }

  ngOnInit(): void {
    this.listarEnVenta();
  }

  listarEnVenta() {
    this.juegoService.listarEnVenta().subscribe(
      (data) => {
        this.juegos = data.juegos;
      },
      (error) => {
        console.error('Error al listar los juegos', error);
      }
    );
  }

  buscarJuegos() {
    this.juegoService.buscarPorFiltro(this.filtros).subscribe(
      (response) => {
        this.juegos = response.juegos;
        console.log(this.juegos);
      },
      (error) => {
        console.error('Error al buscar juegos:', error);
      }
    );
  }

  seguirJuego(id: BigInt) {
    this.juegoService.crearSeguimiento(id).subscribe(
      (data) => {
        this.mostrarResultados(id,data);
        setTimeout(() => {
          this.listarEnVenta();
        },3000);
      },
      (error) => {
        console.error('No se puede seguir el juego', error);
      }
    );
  }

  mostrarResultados(id: BigInt,data: any){
    const resultado = document.getElementById(`results-${id}`);
    if(resultado){
      resultado.style.visibility = 'visible';
      resultado.innerHTML = data.message;
      setTimeout(function() {
        resultado.style.visibility = 'hidden';
        resultado.innerHTML = '';
      }, 3000);
    }

  }

}
