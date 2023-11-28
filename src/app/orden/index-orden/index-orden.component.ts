import {  Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-index-orden',
  templateUrl: './index-orden.component.html',
  styleUrls: ['./index-orden.component.css']
})
export class IndexOrdenComponent {

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
  this.router.navigate(['Dash/orden/', Id]);
  console.log(Id)
}


  listarUsuarios(){

    this.gService.list('user/client')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any)=>{
       
        this.datosUsuario=response.Data;
  
       
      })
  }


}
