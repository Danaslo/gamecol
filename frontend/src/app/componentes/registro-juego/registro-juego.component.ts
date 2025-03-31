import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { JuegoService } from '../../services/juego.service';


@Component({
  selector: 'app-registro-juego',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,HeaderComponent,FooterComponent],
  templateUrl: './registro-juego.component.html',
  styleUrls: ['./registro-juego.component.css']
})
export class RegistroJuegoComponent implements OnInit {

  juegoForm: FormGroup;
  juegos: any[] = [];

  constructor(private fb: FormBuilder, private juegoService: JuegoService) {
    this.juegoForm = this.fb.group({
      nombre: [''],
      condicion: ['precintado'],
      descripcion: [''],
      imagen: [''],
      estado: ['en venta']
    });
  }

  ngOnInit(): void {
    this.listarJuegos();
  }

  agregarJuego() {
    this.juegoService.agregarJuego(this.juegoForm.value).subscribe(
      () => {
        this.listarJuegos();
        this.juegoForm.reset({
          nombre: '',
          condicion: 'precintado',
          descripcion: '',
          imagen: '',
          precio: 0,
          estado: 'en venta'
        });
      },
      (error) => {
        console.error('Error al agregar el juego', error);
      }
    );
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
        this.listarJuegos();
      },
      (error) => {
        console.error('Error al borrar el juego', error);
      }
    );
  }
}
