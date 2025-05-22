import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostModelForm } from '../../../models/posts.models';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-Post-form',
    imports: [
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        NgxMaskDirective
    ],
    templateUrl: './post-form.component.html',
    styleUrl: './post-form.component.scss'
})
export class PostFormComponent {

  @Input() Post: PostModelForm = { id: 0, name: '', email: '', phone: '' }

  @Output() PostSubmited = new EventEmitter<PostModelForm>();

  onSubmit(_: NgForm) {
    this.PostSubmited.emit(this.Post);
  }
}
