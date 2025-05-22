import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PostModelTable } from '../../Post.models';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'app-Post-table',
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatPaginatorModule, 
    MatTooltipModule
  ],
  templateUrl: './Post-table.component.html',
  styleUrl: './Post-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]
})
export class PostTableComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() Posts: PostModelTable[] = []

  dataSource!: MatTableDataSource<PostModelTable>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions']

  private dialogManagerServiceSubscriptions?: Subscription

  @Output() onConfirmDelete = new EventEmitter<PostModelTable>()

  @Output() onRequestUpdate = new EventEmitter<PostModelTable>()

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService,
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Posts'] && this.Posts) {
      this.dataSource = new MatTableDataSource<PostModelTable>(this.Posts)
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

  update(Post: PostModelTable) {
    this.onRequestUpdate.emit(Post)
  }

  delete(Post: PostModelTable) {
    this.dialogManagerService.showYesNoDialog(
      YesNoDialogComponent,
      { title: 'Exclusão de Poste', content: `Confirma a exclusão do Poste ${Post.name}` }
    ).subscribe(result => {
      if (result) {
        this.onConfirmDelete.emit(Post)
        const updatedList = this.dataSource.data.filter(c => c.id !== Post.id)
        this.dataSource = new MatTableDataSource<PostModelTable>(updatedList)
      }
    })
  }
}