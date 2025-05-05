import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-404',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.css'
})
export class Error404Component {

  constructor(private router: Router){

  }

  navigateTo(route: string) {
    this.router.navigate([route]);
}




}
