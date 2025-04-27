import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JuegoService } from '../../services/juego.service';
import {NotificationService} from '../../services/notificacion.service';


@Component({
  selector: 'app-registro-juego',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './registro-juego.component.html',
  styleUrls: ['./registro-juego.component.css']
})
export class RegistroJuegoComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  juegoForm: FormGroup;
  juegos: any[] = [];
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private juegoService: JuegoService, private notificationService: NotificationService) {
    this.juegoForm = this.fb.group({
      nombre: [''],
      condicion: ['precintado'],
      plataforma: [''],
      descripcion: [''],
      imagen: [''],
      estado: ['En venta'],
      precio: [0]
    });
  }

  ngOnInit(): void {
    this.juegoService.listarJuegos();
    this.juegoService.listarJuegos().subscribe(
      (data) => {
        this.juegos = data.juegos;
      },
      (error) => {
        console.error('Error al listar los juegos', error);
      }
    );
    window.addEventListener('keydown', this.cerrarConEscape.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.cerrarConEscape.bind(this));
  }

  cerrarModal() {
    this.close.emit(); 
  }

  cerrarConEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.cerrarModal();  
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedImage = input.files[0];
    }
  }

  agregarJuego(): void {
    const formData = new FormData();
    formData.append('nombre', this.juegoForm.get('nombre')?.value);
    formData.append('condicion', this.juegoForm.get('condicion')?.value);
    formData.append('plataforma', this.juegoForm.get('plataforma')?.value);
    formData.append('descripcion', this.juegoForm.get('descripcion')?.value);
    formData.append('estado', this.juegoForm.get('estado')?.value);
    formData.append('precio', this.juegoForm.get('precio')?.value)

    console.log( 'Estado: ' + this.juegoForm.get('estado')?.value);
      
    if (this.selectedImage) {
      formData.append('imagen', this.selectedImage, this.selectedImage.name);
    }
    this.juegoService.agregarJuego(formData).subscribe(
      () => {
        this.juegoService.listarJuegos();
        this.juegoForm.reset({
          nombre: '',
          condicion: 'Precintado',
          plataforma: '',
          descripcion: '',
          imagen: '',
          precio: 0,
          estado: 'En venta'
        });
      },
      (error) => {
        console.error('Error al agregar el juego', error);
      }
    );

    this.notificationService.crearNotificacion(`Se ha registrado el juego ${this.juegoForm.get('nombre')?.value} para ${this.juegoForm.get('plataforma')?.value}`).subscribe(
      (response) => {
        console.log('Notificación creada:', response);
      }
    );
  }
}
