import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaJuegoComponent } from './venta-juego.component';

describe('VentaJuegoComponent', () => {
  let component: VentaJuegoComponent;
  let fixture: ComponentFixture<VentaJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaJuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
