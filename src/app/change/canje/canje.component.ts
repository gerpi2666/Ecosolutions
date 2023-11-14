import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCenterComponent } from '../../center/dialog-center/dialog-center.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-canje',
  templateUrl: './canje.component.html',
  styleUrls: ['./canje.component.css']
})
export class CanjeComponent {
  datos:any; //Respuesta del API
  datosUsuario:any; //Respuesta del API
  filterDatos: any;
  usuarioSeleccionado: any;
  mostrarDetalleUsuario: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id','nombre', 'total', 'fecha','acciones'];

  constructor(private gService: GenericService,
    private dialog:MatDialog, 
    private router: Router,
    private route: ActivatedRoute)
  {
    this.listarUsuarios();
  }


  ngOnInit() {
    
    this.listarUsuarios();
   
   
  }

  onUsuarioChange(event: any) {
    
    const userId: number = event.target['value'];
    
    // Lógica a realizar cuando cambia el usuario seleccionado
    this.historialCanje(userId);
  }

  historialCanje(user:number){ 
    this.gService.get('orden/user', user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any)=>{ 
        
        this.datos=response.Data;
        this.filterDatos=this.datos

        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       
      })
  }


  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  detailCanje(Id:number){
    console.log('ID',Id)
    //Detalle en formato diálogo
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      Id:Id
     
    };
    this.dialog.open(DialogCenterComponent,dialogConfig);
  }


  listarUsuarios(){

    this.gService.list('user/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any)=>{
       
        this.datosUsuario=response.Data;
  
       
      })
  }

}
