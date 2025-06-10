import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../commons/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/users.models';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  hidePassword = true;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, isEdit: boolean }
  ) {
    this.isEdit = data.isEdit;
    this.userForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(10)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.isEdit && this.data.user) {
      this.userForm.patchValue({
        nome: this.data.user.nome,
        email: this.data.user.email,
        senha: this.data.user.senha,
        foto: ''
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: User = {
        id: this.isEdit ? this.data.user.id : 0,
        nome: this.userForm.value.nome,
        email: this.userForm.value.email,
        senha: this.userForm.value.senha,
        foto: ''
      };
      
      this.dialogRef.close(userData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(field: string): string {
    const control = this.userForm.get(field);
    if (control?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} é obrigatório`;
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${field.charAt(0).toUpperCase() + field.slice(1)} deve ter pelo menos ${minLength} caracteres`;
    }
    return '';
  }
}
