import { Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orden-center',
  templateUrl: './orden-center.component.html',
  styleUrls: ['./orden-center.component.css']
})
export class OrdenCenterComponent {
  datos: any; //Respuesta del API
  center: any; //Respuesta del API

  usuarioSeleccionado: any;
  mostrarDetalleUsuario: any;
  destroy$: Subject<boolean> = new Subject<boolean>();



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id',  'total', 'fecha', 'acciones'];

  constructor(private gService: GenericService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.historialCanje(Number(id));
    }

  }


  historialCanje(id: number) {
    this.gService.get('orden/center', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response.Data;
        console.log(this.datos)
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
    this.router.navigate(['orden/', Id]);
    console.log(Id)
  }



}
