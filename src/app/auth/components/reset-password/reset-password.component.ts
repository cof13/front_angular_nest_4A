import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    // Obtener el token de la URL
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.http.post(`${environment.urlServidor}/auth/reset-password/${this.token}`, { password: this.newPassword })
      .subscribe({
        next: (response) => {
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error al procesar la solicitud';
          this.successMessage = '';
        }
      });
  }
}
