import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';  // Asegúrate de importar Validators

interface Categoria {
  id: number,
  nombre: string,
  detalle: string
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'] // Corregido el estilo
})
export class CategoriaComponent implements OnInit {

  private categoriaService = inject(CategoriaService)

  categorias: Categoria[] = []
  dialog_visible: boolean = false;
  categoria_id: number = -1;
  categoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),  // Validación de 'nombre' requerido
    detalle: new FormControl('')
  })

  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias() {
    this.categoriaService.funListar().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  mostrarDialog() {
    this.dialog_visible = true
  }

  guardarCategoria() {
    if (this.categoriaForm.invalid) {
      alert('El campo "Nombre" es obligatorio');
      return;
    }

    if (this.categoria_id > 0) { // Si se está editando una categoría existente
      this.categoriaService.funModificar(this.categoria_id, this.categoriaForm.value).subscribe(
        (res: any) => {
          this.dialog_visible = false;
          this.getCategorias(); // Recarga la lista de categorías
          this.categoria_id = -1; // Reinicia el id de la categoría para futuros usos
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else { // Si se está creando una nueva categoría
      this.categoriaService.funGuardar(this.categoriaForm.value).subscribe(
        (res: any) => {
          this.dialog_visible = false;
          this.getCategorias(); // Recarga la lista de categorías
        },
        (error: any) => {
          console.log(error);
        }
      );
    }

    this.categoriaForm.reset(); // Resetea el formulario después de guardar
  }
  editarCategoria(cat: Categoria) {
    this.dialog_visible = true
    this.categoria_id = cat.id
    this.categoriaForm.setValue({ nombre: cat.nombre, detalle: cat.detalle })

  }
  eliminarCategoria(cat: Categoria) {

  }
}
