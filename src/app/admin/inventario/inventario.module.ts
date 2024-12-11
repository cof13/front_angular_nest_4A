import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//import { TableModule } from 'primeng/table';
//import { ButtonModule } from 'primeng/button';
//import { DialogModule } from 'primeng/dialog';
//import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../../primeng/primeng.module';


@NgModule({
  declarations: [
    ProductoComponent,
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    //TableModule,
    //ButtonModule,
    //DialogModule,
    //InputTextModule,
    ReactiveFormsModule,
    PrimengModule,
    FormsModule


  ]
})
export class InventarioModule { }
