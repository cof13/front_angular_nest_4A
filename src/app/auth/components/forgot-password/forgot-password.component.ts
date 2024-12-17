import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LayoutService } from '../../../admin/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'), // Validación: solo letras y espacios
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email, // Validación de correo electrónico
    ]),
  });

  loading: boolean = false; // Estado de carga

  @ViewChild('nameInput') nameInput!: ElementRef; // Para enfocar el campo de nombre

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Enfocar automáticamente el campo de nombre al cargar la página
    setTimeout(() => {
      if (this.nameInput) {
        this.renderer.selectRootElement(this.nameInput.nativeElement).focus();
      }
    }, 0);
  }

  get name() {
    return this.forgotPasswordForm.get('name');
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.loading = true;
      const formData = this.forgotPasswordForm.value;

      this.authService.forgotPassword(formData).subscribe(
        (res) => {
          this.loading = false;
          this.showMessage('success', 'Success', res.message);
          setTimeout(() => this.router.navigate(['/auth/login']), 4000);
        },
        (error) => {
          this.loading = false;
          const errorMsg = error.error?.message || 'An unexpected error occurred. Please try again later.';
          this.showMessage('error', 'Error', errorMsg);
        }
      );
    } else {
      this.markAllAsTouched();
      this.showMessage('warn', 'Invalid Form', 'Please complete all fields correctly.');
    }
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  private markAllAsTouched() {
    this.forgotPasswordForm.markAllAsTouched();
  }
}
