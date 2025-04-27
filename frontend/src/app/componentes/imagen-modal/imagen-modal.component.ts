import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imagen-modal.component.html',
  styleUrls: ['./imagen-modal.component.css']
})
export class ModalComponent {
  @Input() modalVisible: boolean = false;
  @Input() modalImage: string = '';
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }
}
