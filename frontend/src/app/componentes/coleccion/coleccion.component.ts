import { Component, OnInit, HostListener } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RegistroJuegoComponent } from '../registro-juego/registro-juego.component';
@Component({
  selector: 'app-coleccion',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule,RegistroJuegoComponent],
  templateUrl: './coleccion.component.html',
  styleUrls: ['./coleccion.component.css']
})
export class ColeccionComponent implements OnInit {
  juegos: any[] = [];
  isModalOpen: boolean = false;

  constructor(private juegoService: JuegoService) {}

  @HostListener('document:keydown', ['$event'])
  cerrarConEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isModalOpen) {
      this.closeModal();
    }
  }
  
  ngOnInit(): void {
    this.listarJuegos(); 
  }

  
  /*
  venderJuego(id: BigInt){
    this.juegoService.venderJuego(id).subscribe(
      (response) => {
        console.log('Juego vendido:', response);
        this.listarJuegos(); 
      },
      (error) => {
        console.error('Error al vender el juego', error);
      }
    );
  }
*/

  venderJuego(idJuego: BigInt){
    this.juegoService.venderJuego(idJuego);
  }


  closeModal() {
    this.isModalOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
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
