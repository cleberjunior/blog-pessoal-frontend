import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);

  onLogin() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (tokenResponse) => {
          console.log('Token: ', tokenResponse);
          this.router.navigate(['dashboard']);
        },
        error: () => {},
      });
  }
}