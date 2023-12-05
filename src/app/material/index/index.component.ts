import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthenticationService } from '../../share/authentication.service';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})


export class IndexComponent {
  datos:any; //Respuesta del API
  filterDatos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser:any

  dataSource = new MatTableDataSource<any>();


  constructor(private gService: GenericService,
    private dialog:MatDialog, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService)
  {
    this.listarMaterial();
    this. authService.decodeToken.subscribe((user:any)=>(
      this.currentUser=user
    ))
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

}
