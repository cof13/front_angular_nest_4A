import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authService=inject(AuthService)
  private router= inject(Router)

  loginForm=new FormGroup({
    email:new FormControl("", [Validators.email, Validators.required]),//valores k kedaran por defecto
    password: new FormControl("", Validators.required)//valores k kedaran por defecto
  })

  funIngresar(){
    
    //si kiero todos los datos eliminados se borra el /1 y lo sustituimos por /todos
    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res)=>{
        console.log(res)
        this.router.navigate(["/admin"])
      },
      (error)=>{
        console.log(error)
      }
      
      
    )
    //alert("Ingresando...")
    //me quedo en la diapositiva 31 osea hacer la 31 
  }

}
