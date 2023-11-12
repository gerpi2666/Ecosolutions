import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})


export class IndexComponent {
  datos:any; //Respuesta del API
  filterDatos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();


  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'precio','acciones'];

  constructor(private gService: GenericService, 
    private router: Router,
    private route: ActivatedRoute)
  {
    this.listarMaterial();

  }


  listarMaterial(){
    //Solicitud al API para listar todos los videojuegos
    //localhost:3000/videojuego
    this.gService.list('material/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any)=>{
        console.log('CALL BACK API',response);
        this.datos=response.Data;
        console.log('DATOS PARA MOSTRAR', this.datos)
        this.filterDatos=this.datos
      })
  }

  
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
