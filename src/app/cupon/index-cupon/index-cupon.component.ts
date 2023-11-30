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
  datos: any;

  constructor(private gService: GenericService) {
    this.listCategorys();
  }

  ngOnInit(): void {}

  cuponChange(category: number) {
    console.log('DATA CAMBIANTE', category);

    this.findCupon(category);
  }

  getImage(Name: string) {
    let data;

    this.gService
      .get('img', `${Name}.png`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        const cupon = this.datos.find((mat: any) => mat.Name === Name);
        if (cupon) {
          cupon.image = `data:image/png;base64,${data.Data}`; // Asignar la imagen al material
          console.log('Imagen asignada a', Name);
        }
      });
  }

  findCupon(category: number) {
    this.gService
      .get('cupon/category', category)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Call api', data);

        this.datos = data.Data;
        this.datos.forEach((material: any) => {
          this.getImage(material.Name); // Llamada para obtener la imagen
        });
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
