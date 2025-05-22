import { Component, Inject, OnDestroy } from '@angular/core';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { TemaService } from '../../../services/tema/tema.service';
import { ITemaService } from '../../../services/tema/itema.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TemaFormComponent } from '../tema-form/tema-form.component';
import { TemaModelForm } from '../../../models/tema.models';
import { SnackbarManagerService } from '../../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../../services/isnackbar-manager.service';
import { CardHeaderComponent } from "../../commons/card-header/card-header.component";
import { MenuBarComponent } from "../../commons/menu-bar/menu-bar.component";

@Component({
    selector: 'app-new-tema',
    imports: [TemaFormComponent, CardHeaderComponent, MenuBarComponent],
    templateUrl: './new-tema.component.html',
    styleUrl: './new-tema.component.scss',
    providers: [
        { provide: SERVICES_TOKEN.HTTP.TEMA, useClass: TemaService },
        { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
    ]
})
export class NewTemaComponent implements OnDestroy {

  title = 'Cadastrar Tema';

  private temaSubscription?: Subscription; // para desinscrever e liberar recurso (memória)

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.TEMA) private readonly temaService: ITemaService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.temaSubscription) {
      this.temaSubscription.unsubscribe();
    }
  }

  onSubmitTema(value: TemaModelForm) {
    const { id, ...request } = value;
    this.temaSubscription = this.temaService.save(request).subscribe(_ => {
      this.snackBarManager.show('Tema cadastrado com sucesso!');
      this.router.navigate(['temas/list']);
    })
  }
}
