import { Component, OnInit, NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogChangeComponent } from '../dialog-change/dialog-change.component';

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css'],
})
export class IndexCuponComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  categorys: any;
  datos: any;
  Wallet:any;
  Valido:boolean
  

  constructor(private gService: GenericService,private dialog:MatDialog, ) {
    this.listCategorys();
    this.Valido=false;
    this.getWallet()
  }

  ngOnInit(): void {}


  //#region cargaCupon
  cuponChange(category: number) {

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
        }
      });
  }

  findCupon(category: number) {
    this.gService
      .get('cupon/category', category)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
       

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
//#endregion

getWallet(){
  this.gService
  .get('wallet/user',4)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    this.Wallet = data.Data;
    console.log('SALDO',this.Wallet.AvaibleCoins)
  });
}

change(Id:number,price:number,name:string){
   this.Valido = Number(price) <= Number(this.Wallet.AvaibleCoins)?true:false;
   const dialogConfig=new MatDialogConfig();
   dialogConfig.disableClose=false;
   dialogConfig.data={
     IdCupon:Id,
     IdUser:4,
     Valido: this.Valido,
     Name: name,
     Price:price,
     IdWallet: this.Wallet.Id
   };
   this.dialog.open(DialogChangeComponent,dialogConfig);
}


}
