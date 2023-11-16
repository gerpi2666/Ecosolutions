import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-dialog-center',
  templateUrl: './dialog-center.component.html',
  styleUrls: ['./dialog-center.component.css']
})
export class DialogCenterComponent  implements OnInit{
  datos: any;
  datosMaterial: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<DialogCenterComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
  }

  
  ngOnInit(): void {
    console.log('DATA INJECTED DIALOG',this.datosDialog)
    if (this.datosDialog.Id) {
      this.obtenerMaterial(this.datosDialog.Id);
    }
  }


  obtenerMaterial(Id: any) {
    const resultado = [];
    this.gService
      .get('center', Id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
       
        this.datos = data.Data;
     
        console.log('DATOS IN THE DIALOG', this.datos.Materials)
      

      });
     
      
  }
  close() {
    //Dentro de close ()
    //this.form.value 
    this.dialogRef.close();
  }
}
