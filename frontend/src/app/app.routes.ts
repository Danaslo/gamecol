// filepath: /Proyecto2/frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { IndexComponent } from './componentes/index/index.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { RegistroJuegoComponent } from './componentes/registro-juego/registro-juego.component';
import { ColeccionComponent } from './componentes/coleccion/coleccion.component';

export const routes: Routes = [
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent},
    { path: '', component: IndexComponent},
    { path: 'contacto', component: ContactoComponent },
    { path: 'coleccion', component: ColeccionComponent},
    { path: '**', redirectTo: '' },

];