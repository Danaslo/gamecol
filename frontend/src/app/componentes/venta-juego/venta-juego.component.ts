import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JuegoService } from '../../services/juego.service';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-venta-juego',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './venta-juego.component.html',
  styleUrl: './venta-juego.component.css'
})

export class VentaJuegoComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Input() juegoId: number | null = null;
  ventaForm: FormGroup;

  constructor(private fb: FormBuilder, private ventaService: VentaService) {
    this.ventaForm = this.fb.group({
      telefono: ['']
    });
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.cerrarConEscape.bind(this));
  }

  registrarVenta() {
    const telefono = this.ventaForm.get('telefono')?.value;
    if (this.juegoId != null) {
      console.log('Enviando al backend:', this.juegoId, telefono);
      this.ventaService.agregarVenta(this.juegoId, telefono).subscribe({
        next: () => {
          alert('Venta registrada correctamente');
          this.cerrarModal();
          window.location.reload()
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar la venta');
        }
      });
    } else {
      console.log('Error: juegoId es null');
    }
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
}