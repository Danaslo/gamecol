// filepath: /Proyecto2/frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Routes = [
    { path: 'registro', component: RegistroComponent },
    { path: '', component: LoginComponent}
];