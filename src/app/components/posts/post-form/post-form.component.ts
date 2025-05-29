import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../../models/posts.models';
import { AngularMaterialModule } from '../../commons/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PostFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: Post, isEdit: boolean }
  ) {
    this.isEdit = data.isEdit;
    this.postForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      conteudo: ['', [Validators.required, Validators.minLength(10)]],
      autor: ['', [Validators.required, Validators.minLength(2)]],
      temaId: [1, [Validators.required, Validators.min(1)]],
      //usuarioId: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    if (this.isEdit && this.data.post) {
      this.postForm.patchValue({
        titulo: this.data.post.titulo,
        conteudo: this.data.post.conteudo,
        autor: this.data.post.autor,
        temaId: this.data.post.temaId,
        usuarioId: 1
      });
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const postData: Post = {
        id: this.isEdit ? this.data.post.id : 0,
        titulo: this.postForm.value.titulo,
        conteudo: this.postForm.value.conteudo,
        autor: this.postForm.value.autor,
        temaId: this.postForm.value.temaId,
        usuarioId: 1
      };
      
      this.dialogRef.close(postData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(field: string): string {
    const control = this.postForm.get(field);
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
