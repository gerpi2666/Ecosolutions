import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {  MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCenterComponent } from '../dialog-center/dialog-center.component';
import { AuthenticationService } from '../../share/authentication.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexCenterComponent {
  datos:any; //Respuesta del API
  filterDatos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser:any


  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
 
  constructor(private gService: GenericService,
    private dialog:MatDialog, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService)
  {
    this.LisCenter();
    this. authService.decodeToken.subscribe((user:any)=>(
      this.currentUser=user
    ))
  }


  LisCenter(){
    //Solicitud al API para listar todos los videojuegos
    //localhost:3000/videojuego
    this.gService.list('center/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any)=>{
        //console.log('CALL BACK API',response);
        this.datos=response.Data;
        //console.log('DATOS PARA MOSTRAR', this.datos)
        this.filterDatos=this.datos
      })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  filterMaterial(text: string) {
    if(!text){
      this.filterDatos=this.datos
    }else{
      this.filterDatos=this.datos.filter(
        videojuego=> 
          videojuego?.Name.toLowerCase().includes(text.toLowerCase())
      )
    }
  }

  detailCenter(Id:number){
    console.log('ID',Id)
    //Detalle en formato diálogo
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      Id:Id
     
    };
    this.dialog.open(DialogCenterComponent,dialogConfig);
  }

}
