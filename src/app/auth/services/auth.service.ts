import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.urlServidor;  
  private http = inject(HttpClient); 

  constructor() {}


  loginConNest(credenciales: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credenciales).pipe(
      tap((res: any) => {  
        if (credenciales.rememberMe) {

          localStorage.setItem('authToken', res.token);
        } else {
          sessionStorage.setItem('authToken', res.token);
        }
      })
    );
  }

  registroConNest(datos: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, datos);
  }

  getToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  }

  forgotPassword(email: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/forgot-password`, { email });
  }

  resetPasswordWithCode(code: string, newPassword: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/reset-password-with-code`, { code, newPassword });
  }
}
