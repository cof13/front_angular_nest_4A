import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", Validators.required),
    rememberMe: new FormControl(false)
  });

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('authToken')) {
      this.loginForm.get('rememberMe')?.setValue(true);
    }
  }

  funIngresar() {
    const rememberMe = this.loginForm.get('rememberMe')?.value;
    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        const tokenExpirationTime = rememberMe ? 2 * 60 * 1000 : 1 * 60 * 1000; 
        this.startTimer(tokenExpirationTime);
  

        if (typeof window !== 'undefined') {
          if (rememberMe) {
            localStorage.setItem('authToken', res.token); 
          } else {
            sessionStorage.setItem('authToken', res.token); 
          }
        }
  
        this.router.navigate(["admin"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  startTimer(expirationTime: number) {
    let timer = expirationTime / 1000;
    const interval = setInterval(() => {
      console.log(`Tiempo restante: ${timer} segundos`);
      timer--;
  
      if (timer < 0) {
        clearInterval(interval);
        console.log('El token ha expirado');
      }
    }, 1000);
  }}
  
