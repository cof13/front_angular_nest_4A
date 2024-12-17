import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LayoutService } from '../../../admin/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent {

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordsMatchValidator });

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { name, mail, password } = this.registerForm.value;
      const registerData = { name, mail, password };

      this.authService.register(registerData).subscribe(
        (res) => {
          console.log('Registration successful:', res);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration successful. You can now log in.' });
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          console.error('Registration error:', error);
          const errorMsg = error.error.message || 'An error occurred during registration.';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Invalid Form', detail: 'Please complete the form correctly.' });
    }
  }
}
