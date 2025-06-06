import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { IDialogManagerService } from './idialog-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { YesNoDialogComponent } from '../components/commons/yes-no-dialog/yes-no-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService implements IDialogManagerService {

  constructor(private readonly dialog: MatDialog) { }

  showYesNoDialog(component: ComponentType<YesNoDialogComponent>, data: { title: string; content: string; }): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      width: '400px',
      data
    })

    return dialogRef.afterClosed()
  }
}