import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../commons/angular-material/angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      AngularMaterialModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Se já estiver logado, redirecionar para dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (result) => {
          if (result.success) {
            this.snackBar.open('Login realizado com sucesso!', 'Fechar', { duration: 3000 });
            this.router.navigate(['/dashboard']);
          } else {
            this.snackBar.open('Credenciais inválidas', 'Fechar', { duration: 3000 });
          }
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open('Erro ao fazer login', 'Fechar', { duration: 3000 });
          console.error('Erro de login:', error);
          this.isLoading = false;
        }
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    
    if (control?.hasError('required')) {
      return `${field === 'email' ? 'Email' : 'Senha'} é obrigatório`;
    }
    
    if (field === 'email' && control?.hasError('email')) {
      return 'Email inválido';
    }
    
    if (field === 'password' && control?.hasError('minlength')) {
      return 'Senha deve ter pelo menos 6 caracteres';
    }
    
    return '';
  }

  /*onLogin() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (tokenResponse) => {
          console.log('Token: ', tokenResponse);
          this.router.navigate(['dashboard']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);

          //const UNAUTHORIZED_RESPONSE_ERROR = 401;
          const FORBIDDEN_RESPONSE_ERROR = 403;

          if (error.status === FORBIDDEN_RESPONSE_ERROR) {
            this.loginForm.setErrors({ 'invalidCredentials': true });
          } else {
            this.loginForm.setErrors({ 'generalCredentialsError': true });
          }
        },
      });
  }*/
}
