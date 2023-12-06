import { Component, ViewChild,OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from '../../share/authentication.service';
import { MiscService } from '../../share/misc.service';

@Component({
  selector: 'app-orden-center',
  templateUrl: './orden-center.component.html',
  styleUrls: ['./orden-center.component.css']
})
export class OrdenCenterComponent  implements OnInit{
  datos: any; //Respuesta del API
  center: any; //Respuesta del API

  usuarioSeleccionado: any;
  mostrarDetalleUsuario: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser:any
  


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id',  'total', 'fecha', 'acciones'];

  constructor(private gService: GenericService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private miscService: MiscService) {
    
     
    

  }

  ngOnInit(): void {
    this. authService.decodeToken.subscribe((user:any)=>(
      this.currentUser=user
    ))
    console.log('DATA USER ',this.currentUser);
    this.historialCanje();
  }

  historialCanje() {
    this.gService.get('orden/center', this.currentUser.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        let list=[]
        response.Data.forEach(element => {
          element.Date= this.miscService.formatDate(element.Date)
          list.push(element)
        });
        this.datos = list;
        console.log('Call api',this.datos)
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  detailCanje(Id: number) {
   /*  this.router.navigate(['orden/', Id]);
    console.log(Id) */
  }



}
