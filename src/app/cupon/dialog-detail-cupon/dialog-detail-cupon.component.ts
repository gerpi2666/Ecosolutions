import { Component, Inject, OnInit } from '@angular/core';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-detail-cupon',
  templateUrl: './dialog-detail-cupon.component.html',
  styleUrls: ['./dialog-detail-cupon.component.css']
})
export class DialogDetailCuponComponent {

datos:any
datosDialog:any
destroy$: Subject<boolean> = new Subject<boolean>();

constructor(  @Inject(MAT_DIALOG_DATA) data,private gService: GenericService){
  this.datosDialog = data;
  this.getData()
}

getData() {
  this.gService
    .get('cupon', this.datosDialog.Id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.datos = data.Data[0];
      
      this.datos.ValiteDate=this.formatDate(this.datos.ValiteDate)
      console.log('DATos', this.datos);
     
    });
}

formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

}
