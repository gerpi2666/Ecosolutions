import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-dialog-change',
  templateUrl: './dialog-change.component.html',
  styleUrls: ['./dialog-change.component.css'],
})
export class DialogChangeComponent {
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<DialogChangeComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
    console.log('DIALOG INFO', this.datosDialog);
  }

  canjear() {
    let transac = {
      IdCupon:this.datosDialog.IdCupon,
      IdUser:this.datosDialog.IdUser,
      IdWallet: this.datosDialog.IdWallet,
      Price: this.datosDialog.Price,
    };
 console.log('DTA PRE POST',transac)
   /*  this.gService
      .create('cupon/change', transac)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('CALL API', data)
      }); */

     
  }
}
