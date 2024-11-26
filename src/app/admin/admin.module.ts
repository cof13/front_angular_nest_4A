import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ClienteComponent } from './components/cliente/cliente.component';
import { LayoutComponent } from './layout/layout.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { CategoriaService } from './inventario/services/categoria.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TableModule } from 'primeng/table';
import { InventarioModule } from './inventario/inventario.module';


@NgModule({
  declarations: [
    ClienteComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppLayoutModule,
    TableModule,
    InventarioModule
  ],
  providers: [
    CategoriaService
  ]
})
export class AdminModule { }

//si tengo algun error de enrutamiento es aqui diapositiva 3 clase 13