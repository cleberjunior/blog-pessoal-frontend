import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TemaModelForm } from '../../../models/tema.models';

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

  @Input() tema: TemaModelForm = { id: 0, descricao: '' }

  @Output() temaSubmited = new EventEmitter<TemaModelForm>();

  onSubmit(_: NgForm) {
    this.temaSubmited.emit(this.tema);
  }
}
