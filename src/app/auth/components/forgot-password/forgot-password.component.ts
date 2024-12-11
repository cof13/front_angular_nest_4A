import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  email: string = ''; 

  constructor(private http: HttpClient) {}
  onSubmit() {
    const body = { email: this.email }; 

    this.http.post(`${environment.urlServidor}/auth/forgot-password`, body).subscribe({
      next: (response) => {
        alert('Enlace de recuperación enviado a su correo electrónico.');
      },
      error: (error) => {
        console.error('Error detallado:', error);  // Esto mostrará más detalles sobre el error
        alert('Error al enviar el enlace de recuperación. Inténtelo de nuevo.');
      },
    });
  }
}
