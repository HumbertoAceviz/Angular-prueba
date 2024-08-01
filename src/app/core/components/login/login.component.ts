import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // http = inject(HttpClient)
  router = inject(Router);
  loginService = inject(LoginService);
  email: string = '';
  password: string = '';

  constructor() {}

  onSubmit() {
    this.loginService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigateByUrl('home');
      },
      error: (err) => {
        console.log('No existe el usuario');
      },
    });
  }
}
