import { Component,OnInit } from '@angular/core';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import {OrderService,OrdeDetail} from 'src/app/share/orderDetail.service'
@Component({
  selector: 'app-create-orden',
  templateUrl: './create-orden.component.html',
  styleUrls: ['./create-orden.component.css'],
})
export class CreateOrdenComponent implements OnInit {
  materials: any;
  total=0
  User:{
    Id:number,
    Identification:any,
    Name:any,
    Email:any,
    Phone:any
  
  }
  displayedColumns: string[] = ['Material', 'Precio', 'Cantidad', 'Subtotal','Acciones'];
  Date:any
  centerName: string;
  dataCustomer: any;
  dataCenter: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource = new MatTableDataSource<any>();


  constructor(private gService: GenericService, private orderservice: OrderService,) {
    this.User = {
      Identification: null,
      Id:null,
      Name: null,
      Email: null,
      Phone: null
    };
    this.Date = this.formatDate(Date.now());
    this.listarUsuarios();
    this.getCenter();
  }

  ngOnInit(): void {
    this.orderservice.currentDataOrden$.subscribe(data=>{
     this.dataSource= new MatTableDataSource(data)
    })
    this.total=this.orderservice.getTotal()
    //this.orderservice.deleteCart()
   }
 

  //#region datos encabezado
  onUsuarioChange(userId: number) {
    console.log('ID cambiante', userId);
    this.findUser(userId);
  }

  findUser(Id:number){

    this.gService.get('user',Id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:any)=>{
      console.log('DATA RESPONSE', response.Data)
       this.User.Id=response.Data.Id
       this.User.Identification=response.Data.Identification
       this.User.Email= response.Data.Email
       this.User.Name=response.Data.Name
       this.User.Phone= response.Data.Number
    })

  }


  getCenter() {
    this.gService
      .get('center/user', 11)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.dataCenter = response.Data;
        this.centerName = response.Data.Name;
        this.materials = response.Data.Materials;
        console.log('DATA CENTER', this.dataCenter);
      });
  }

  listarUsuarios() {
    this.gService
      .list('user/client')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.dataCustomer = response.Data;
      });
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  //#endregion
  
 //#region detalle orden
  canjear(id:number,price:number,Name:string){
    let detail= new OrdeDetail()
    detail.Name= Name;
    detail.Cantidad=1;
    detail.MaterialId=id;
    detail.Price=price;
    detail.Subtotal=0;
     console.log('Detalle Etrante',detail)
    this.orderservice.addToCart(detail)
    console.log('Detalles generados',this.orderservice.quantityItems())
    
  } 

  actualizarCantidad(item: any) {
    this.orderservice.addToCart(item)
    this.total=this.orderservice.getTotal()
   }
   eliminarItem(item: any) {
    this.orderservice.removeFromOrder(item)
    this.total=this.orderservice.getTotal()
  }
//endregion


}
