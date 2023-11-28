import { DialogComponent } from './../../material/dialog/dialog.component';
import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCenterComponent } from 'src/app/center/dialog-center/dialog-center.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],

})
export class InicioComponent {

  datos:any; //Respuesta del API
  filterDatos: any;

  datos2:any; //Respuesta del API
  filterDatos2: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  
  constructor(private gService: GenericService,
    private dialog:MatDialog, 
    private router: Router,
    private route: ActivatedRoute)
  {
    this.listarMaterial();

    this.LisCenter();
   
  }


  
  getImage(Name:string){
    let data;
    
    this.gService
      .get('img', `${Name}.png`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        
        const material = this.datos.find((mat: any) => mat.Name === Name);
      if (material) {
        material.image = `data:image/png;base64,${data.Data}`; // Asignar la imagen al material
        console.log('Imagen asignada a', Name);
      }
        
      });

      
  }

  
  listarMaterial(){
    //Solicitud al API para listar todos los videojuegos
    //localhost:3000/videojuego
    this.gService.list('material/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any)=>{
        //console.log('CALL BACK API',response);
        this.datos = response.Data;
        console.log('DATOS PARA MOSTRAR', this.datos);
  
        // Por cada material, obtener la imagen
        this.datos.forEach((material: any) => {
          this.getImage(material.Name); // Llamada para obtener la imagen
        });
      })
  }

  LisCenter(){
    //Solicitud al API para listar todos los videojuegos
    //localhost:3000/videojuego
    this.gService.list('center/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response2:any)=>{
        //console.log('CALL BACK API',response);
        this.datos2=response2.Data;
        //console.log('DATOS PARA MOSTRAR', this.datos)
        this.filterDatos=this.datos2
      })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

 
  detailMaterial(Id:number){
    console.log('ID',Id)
    //Detalle en formato diálogo
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      Id:Id
     
    };
    this.dialog.open(DialogComponent,dialogConfig);
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


