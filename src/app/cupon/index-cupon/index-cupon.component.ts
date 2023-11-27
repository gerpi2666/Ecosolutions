import { Component, OnInit, NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css'],
})
export class IndexCuponComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  categorys: any;
  datos:any
  constructor(private gService: GenericService) {
    this.listCategorys();
  }

  ngOnInit(): void {}

  cuponChange(category: number){
    console.log('DATA CAMBIANTE', category)
  
    this.findCupon(category)
   
  }

findCupon(category:number){
  this.gService
      .get('cupon/category',category)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Call api', data)

        this.datos = data.Data;
      });
}


  listCategorys() {
    this.gService
      .list('category')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.categorys = data.Data;
      });
  }
}
