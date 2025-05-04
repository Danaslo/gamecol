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
  isImageModalOpen: boolean = false;
  selectedImage: string = '';

  ngOnInit(): void{
    this.listarSeguimientos();
  }

  openImageModal(image: string) {
    console.log('se abre');
    this.selectedImage = image;
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
    this.selectedImage = '';
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
      (data) => {
        this.mostrarResultados(idJuego,data);
        setTimeout(() => {
          this.listarSeguimientos();
        },3000);
      },
      (error) => {
        console.error('No se ha podido cambiar el estado de venta del juego', error);
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
