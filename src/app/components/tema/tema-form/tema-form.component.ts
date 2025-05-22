import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TemaModelForm } from '../../tema.models';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-tema-form',
    imports: [
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        NgxMaskDirective
    ],
    templateUrl: './tema-form.component.html',
    styleUrl: './tema-form.component.scss'
})
export class TemaFormComponent {

  @Input() tema: TemaModelForm = { id: 0, name: '', email: '', phone: '' }

  @Output() temaSubmited = new EventEmitter<TemaModelForm>();

  onSubmit(_: NgForm) {
    this.temaSubmited.emit(this.tema);
  }
}
