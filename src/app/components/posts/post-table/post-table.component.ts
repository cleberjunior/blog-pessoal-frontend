import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from './custom-paginator';
import { PostModelTable } from '../../../models/posts.models';
import { YesNoDialogComponent } from '../../commons/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-post-table',
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatPaginatorModule, 
    MatTooltipModule
  ],
  templateUrl: './post-table.component.html',
  styleUrl: './post-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]
})
export class PostTableComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() posts: PostModelTable[] = []

  dataSource!: MatTableDataSource<PostModelTable>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['titulo', 'conteudo', 'autor', 'actions']

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
    if (changes['posts'] && this.posts) {
      this.dataSource = new MatTableDataSource<PostModelTable>(this.posts)
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

  update(post: PostModelTable) {
    this.onRequestUpdate.emit(post)
  }

  delete(post: PostModelTable) {
    this.dialogManagerService.showYesNoDialog(
      YesNoDialogComponent,
      { title: 'Exclusão de Postagem', content: `Confirma a exclusão do Post ${post.titulo}` }
    ).subscribe(result => {
      if (result) {
        this.onConfirmDelete.emit(post)
        const updatedList = this.dataSource.data.filter(c => c.id !== post.id)
        this.dataSource = new MatTableDataSource<PostModelTable>(updatedList)
      }
    })
  }
}