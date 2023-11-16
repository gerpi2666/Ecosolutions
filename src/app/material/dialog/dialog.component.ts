import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<DialogComponent>,
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

  getImage(Name:string){
    let data;
    
    this.gService
      .get('img', `${Name}.png`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        
      /*   const material = this.datos.find((mat: any) => mat.Name === Name);
      if (material) {
        material.image = `data:image/png;base64,${data.Data}`; // Asignar la imagen al material
        console.log('Imagen asignada a', Name);

      } */
      
      this.datos.image= `data:image/png;base64,${data.Data}`
      });

      
  }



  obtenerMaterial(Id: any) {
    this.gService
      .get('material', Id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //console.log('Call back api',data.Data)
        this.datos = data.Data;
        //console.log('DATOS IN THE DIALOG', this.datos)
        this.getImage(this.datos.Name)
        console.log('DATOS',this.datos)
      });

  }
  close() {
    //Dentro de close ()
    //this.form.value 
    this.dialogRef.close();
  }
}
