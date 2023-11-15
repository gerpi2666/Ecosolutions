import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  datos: any; //Respuesta del API
  datosDetail: any; //Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService,
    private route:ActivatedRoute) {
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.getOrder(Number(id));
        this.getMaterial(Number(id));
      }
  }

  getOrder(id: any) {
    this.gService
      .get('orden/', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
     
        this.datos = data.Data;
       
      });
  }

  
  getMaterial(id: any) {
    const resultado = [];

    this.gService
      .get('ordenDetail/', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
  
        this.datosDetail = data.Data;
        console.log(this.datosDetail);
        
       
        this.datosDetail.forEach((item) => {
          const {Material , Subtotal, Cantidad } = item;
          resultado.push({ Material, Subtotal, Cantidad });
        });
      });
     
      this.datosDetail=resultado;
      return resultado;
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
