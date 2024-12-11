import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
//import { ButtonModule } from 'primeng/button';
//import { PasswordModule } from 'primeng/password';
import { PrimengModule } from '../primeng/primeng.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  providers:[
    AuthService
  ],
  declarations:[
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengModule,
    FormsModule
  ]
})
export class AuthModule { }
