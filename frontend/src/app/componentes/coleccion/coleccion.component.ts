import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.listarJuegos(); 
  }

  openModal() {
    this.isModalOpen = true;
  }


  closeModal() {
    this.isModalOpen = false;
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
