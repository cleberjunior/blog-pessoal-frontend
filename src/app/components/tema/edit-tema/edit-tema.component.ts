import { Component, Inject } from '@angular/core';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { TemaService } from '../../../services/tema/tema.service';
import { ITemaService } from '../../../services/tema/itema.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaFormComponent } from '../tema-form/tema-form.component';
import { SnackbarManagerService } from '../../../services/snackbar-manager.service';
import { TemaModelForm } from '../../../models/tema.models';
import { ISnackbarManagerService } from '../../../services/isnackbar-manager.service';
import { CardHeaderComponent } from "../../commons/card-header/card-header.component";
import { MenuBarComponent } from "../../commons/menu-bar/menu-bar.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-tema',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TemaFormComponent, CardHeaderComponent, MenuBarComponent],
    templateUrl: './edit-tema.component.html',
    styleUrl: './edit-tema.component.scss',
    providers: [
        { provide: SERVICES_TOKEN.HTTP.TEMA, useClass: TemaService },
        { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
    ]
})
export class EditTemaComponent {

  title = 'Atualizar Tema';

  private httpSubscriptions: Subscription[] = []

  tema: TemaModelForm = { id: 0, descricao: '' }

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.TEMA) private readonly temaService: ITemaService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informações do temae')
      this.router.navigate(['temas/list'])
      return
    }
    
    this.httpSubscriptions?.push(this.temaService.findById(Number(id)).subscribe(data => this.tema = data))
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe())
  }

  onSubmitTema(value: TemaModelForm) {
    const { id, ...request } = value
    if (id) {
      this.httpSubscriptions?.push(this.temaService.update(id, request).subscribe(_ => {
        this.snackBarManager.show('Tema autalizado com sucesso')
        this.router.navigate(['temas/list'])
      }))
      return
    }
    this.snackBarManager.show('Um erro inesperado aconteceu')
    this.router.navigate(['temas/list'])
  }
}
