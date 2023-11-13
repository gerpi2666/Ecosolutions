import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-material-diag',
  templateUrl: './material-diag.component.html',
  styleUrls: ['./material-diag.component.css']
})
export class MaterialDiagComponent implements OnInit {

  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<MaterialDiagComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerMaterial(this.datosDialog.id);
    }
  }
  obtenerMaterial(id: any) {
    this.gService
      .get('material', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(this.datos)
        this.datos = data;

      });

  }
  close() {
    //Dentro de close ()
    //this.form.value 
    this.dialogRef.close();
  }

}
