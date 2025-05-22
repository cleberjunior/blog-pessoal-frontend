import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TemaModelTable } from '../../../models/tema.models';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../../components/commons/yes-no-dialog/yes-no-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'app-tema-table',
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatPaginatorModule, 
    MatTooltipModule
  ],
  templateUrl: './tema-table.component.html',
  styleUrl: './tema-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]
})
export class TemaTableComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() temas: TemaModelTable[] = []

  dataSource!: MatTableDataSource<TemaModelTable>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions']

  private dialogManagerServiceSubscriptions?: Subscription

  @Output() onConfirmDelete = new EventEmitter<TemaModelTable>()

  @Output() onRequestUpdate = new EventEmitter<TemaModelTable>()

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService,
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['temas'] && this.temas) {
      this.dataSource = new MatTableDataSource<TemaModelTable>(this.temas)
      if (this.paginator) {
        this.dataSource.paginator = this.paginator
      }
    }
  }

  ngOnDestroy(): void {
    if (this.dialogManagerServiceSubscriptions) {
      this.dialogManagerServiceSubscriptions.unsubscribe()
    }
  }

  formatPhone(phone: string) {
    return `( ${phone.substring(0, 2)} ) ${phone.substring(2, 7)} - ${phone.substring(7)}`
  }

  update(tema: TemaModelTable) {
    this.onRequestUpdate.emit(tema)
  }

  delete(tema: TemaModelTable) {
    this.dialogManagerService.showYesNoDialog(
      YesNoDialogComponent,
      { title: 'Exclusão de tema', content: `Confirma a exclusão do tema ${tema.name}` }
    ).subscribe(result => {
      if (result) {
        this.onConfirmDelete.emit(tema)
        const updatedList = this.dataSource.data.filter(c => c.id !== tema.id)
        this.dataSource = new MatTableDataSource<TemaModelTable>(updatedList)
      }
    })
  }
}