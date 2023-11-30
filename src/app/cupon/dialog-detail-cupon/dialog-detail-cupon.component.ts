import { Component, Inject, OnInit } from '@angular/core';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MiscService } from '../../share/misc.service';


@Component({
  selector: 'app-dialog-detail-cupon',
  templateUrl: './dialog-detail-cupon.component.html',
  styleUrls: ['./dialog-detail-cupon.component.css']
})
export class DialogDetailCuponComponent {

datos:any
datosDialog:any
destroy$: Subject<boolean> = new Subject<boolean>();

constructor(  @Inject(MAT_DIALOG_DATA) data,private gService: GenericService, private miscService: MiscService){
  this.datosDialog = data;
  this.getData()
}

getData() {
  this.gService
    .get('cupon', this.datosDialog.Id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.datos = data.Data[0];
      
      this.datos.ValiteDate=this.miscService.formatDate(this.datos.ValiteDate)
      console.log('DATos', this.datos);
     
    });
}



}
