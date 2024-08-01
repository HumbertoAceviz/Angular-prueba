import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  loginService = inject(LoginService);
  registerForm = inject(FormBuilder);
  router = inject(Router);

  form = this.registerForm.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  //Al hacer click en registrar llamamos al metodo para registrar del servicio con los datos
  onSubmit(): void {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();
      this.loginService.register(rawForm.email, rawForm.password).subscribe({
        next: () => {
          this.router.navigateByUrl('home'); //Si se registra, mandamos a la pagina home
        },
        error: (err) => {
          console.error('Registration error:', err);
        },
      });
    }
  }
}
