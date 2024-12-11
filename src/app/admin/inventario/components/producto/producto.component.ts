import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  private productoService= inject(ProductoService)

  categorias:any = [
    { name: 'Ropa Dama', code: 'RD' },
    { name: 'Ropa Caballero', code: 'RC' },
    { name: 'Herramientas', code: 'He' },
    { name: 'Tecnologia', code: 'Tec' },
    { name: 'Hogar', code: 'Hgr' }
  ];
  products:any[] = [
    { id: 1, nombre: 'Teclado', precio: 394.96, categoria_id:5,stock:12,estado:"COMPLETO"},
    { id: 1, nombre: 'Teclado', precio: 394.96, categoria_id:5,stock:12,estado:"COMPLETO"},
    { id: 1, nombre: 'Teclado', precio: 394.96, categoria_id:5,stock:12,estado:"COMPLETO"},
    { id: 1, nombre: 'Teclado', precio: 394.96, categoria_id:5,stock:12,estado:"COMPLETO"},
    { id: 1, nombre: 'Teclado', precio: 394.96, categoria_id:5,stock:12,estado:"COMPLETO"},
  ];
  cols:any[]=[];
  constructor(){

    this.productoService.funListar2().subscribe(
      (res:any)=>{
        this.products=res.data
      }
    )
  }

  openNew() {
    console.log('Abrir formulario para crear un nuevo producto');
  }

  editProduct(product: any) {
    console.log('Editar producto:', product);
  }
  deleteProduct(product: any) {
    console.log('Eliminar producto:', product);
    this.products = this.products.filter(p => p !== product);
  }
}
