import { Component } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [],
  template: `
    <h1> {{Titulo}} </h1>
    <p>
      nostros works!
    </p>
  `,
  styles: `
  h1{
    color: #00f;
  }
  `
})
export class NosotrosComponent {
  public Titulo : string = "Acerca de nostros"
}
