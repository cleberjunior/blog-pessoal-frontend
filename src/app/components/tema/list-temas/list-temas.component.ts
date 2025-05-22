import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { TemaService } from '../../../services/tema/tema.service';
import { ITemaService } from '../../../services/tema/itema.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TemaTableComponent } from '../tema-table/tema-table.component';
import { SnackbarManagerService } from '../../../services/snackbar-manager.service';
import { TemaModelTable } from '../../../models/tema.models';
import { ISnackbarManagerService } from '../../../services/isnackbar-manager.service';

@Component({
  selector: 'app-list-temas',
  imports: [TemaTableComponent],
  templateUrl: './list-temas.component.html',
  styleUrl: './list-temas.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.TEMA, useClass: TemaService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ]
})
export class ListTemasComponent implements OnInit, OnDestroy {

  private httpSubscriptions: Subscription[] = []

  temas: TemaModelTable[] = []

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.TEMA) private readonly httpService: ITemaService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(this.httpService.list().subscribe(data => this.temas = data))
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe())
  }

  update(tema: TemaModelTable) {
    this.router.navigate(['temas/edit-tema', tema.id])
  }

  delete(tema: TemaModelTable) {
    this.httpSubscriptions.push(
      this.httpService.delete(tema.id).subscribe(_ => this.snackBarManager.show(`O tema ${tema.descricao} foi excluido com sucesso`))
    )
  }
}
