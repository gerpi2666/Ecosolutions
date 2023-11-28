import { Component, ViewChild } from '@angular/core';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDetailCuponComponent } from '../dialog-detail-cupon/dialog-detail-cupon.component';

@Component({
  selector: 'app-cupon-user-index',
  templateUrl: './cupon-user-index.component.html',
  styleUrls: ['./cupon-user-index.component.css'],
})
export class CuponUserIndexComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['Numero', 'Nombre', 'Valido hasta', 'Acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  constructor(private gService: GenericService,private dialog:MatDialog) {
    this.getData();
  }

  getData() {
    this.gService
      .get('cupon/user', 4)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data.Data;
        console.log('DATA RESPONSE', data);
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detailCanje(Id: any) {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      IdCupon:Id,
      
    };
    this.dialog.open(DialogDetailCuponComponent,dialogConfig);

  }
}
