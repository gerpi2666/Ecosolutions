import {  Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent1 {

  datos:any; //Respuesta del API
  datosUsuario:any; //Respuesta del API
  filterDatos: any;
  usuarioSeleccionado: any;
  mostrarDetalleUsuario: any;
  isEnabled: boolean
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;





  displayedColumns = ['id','nombre', 'email', 'rol','number',  'acciones'];


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


  
    listarUsuarios(){

    this.gService.list('user/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any)=>{
       
        let list=[]
       response.Data.forEach(element => {
       if(element.Role.Id!=1){
         list.push(element)
       }
       });
        this.datos=list;
        console.log('DATOS',this.datos)
      
       
      })
  }

    
  actualizarTabla(){

    this.gService.list('user/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any)=>{
       
        this.datos=response.Data;
  
       
      })
  }

  disableUser(Id:number){
    let Ide:{
      id:any
    }= { id: null }; 
    Ide.id=Id
    console.log('ID',Ide)
    this.gService
    .update(`user/disabled`,Ide)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {

      console.log('Api response', data)
    });
  }





}
