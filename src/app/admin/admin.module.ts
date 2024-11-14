import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ClienteComponent } from './components/cliente/cliente.component';
import { LayoutComponent } from './layout/layout.component';
//import { PerfilComponent } from './components/perfil/perfil.component';


@NgModule({
  declarations: [
    ClienteComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

//si tengo algun error de enrutamiento es aqui diapositiva 3 clase 13