// filepath: /Proyecto2/frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { IndexComponent } from './componentes/index/index.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { ColeccionComponent } from './componentes/coleccion/coleccion.component';
import { MercadoComponent } from './componentes/mercado/mercado.component';
import { SeguimientoComponent } from './componentes/seguimiento/seguimiento.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { AdminComponent } from './componentes/admin/admin.component';

export const routes: Routes = [
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: IndexComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'coleccion', component: ColeccionComponent },
    { path: 'mercado', component: MercadoComponent },
    { path: 'seguimientos', component: SeguimientoComponent },
    { path: 'ventas',component: VentasComponent },
    { path: 'admin', component: AdminComponent},
    { path: '**', redirectTo: '' },
];