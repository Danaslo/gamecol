import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { JuegoService } from '../../services/juego.service';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.css'
})
export class SeguimientoComponent {
  juegos: any[] = []
  constructor(private juegoService: JuegoService){}

  ngOnInit(): void{
    this.listarSeguimientos();
  }

  listarSeguimientos() {
    this.juegoService.listarSeguimientos().subscribe(
      (data) => {
        this.juegos = data.juegos;
      },
      (error) => {
        console.error('Error al listar los juegos', error);
      }
    );
  }

  borrarSeguimiento(idJuego: BigInt){
    this.juegoService.borrarSeguimiento(idJuego).subscribe(
      (response) => {
        console.log('Juego seguido destruído: ',response);
        this.listarSeguimientos();
      }
    )
  }
}
