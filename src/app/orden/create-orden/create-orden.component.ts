import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { OrderService, OrdeDetail } from 'src/app/share/orderDetail.service';
import { MiscService } from '../../share/misc.service';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';
@Component({
  selector: 'app-create-orden',
  templateUrl: './create-orden.component.html',
  styleUrls: ['./create-orden.component.css'],
})
export class CreateOrdenComponent implements OnInit {
  materials: any;
  total = 0;
  User: {
    Id: number;
    Identification: any;
    Name: any;
    Email: any;
    Phone: any;
  };
  Orden: {
    IdUser: number;
    IdCenter: number;
    Date: any;
    Total: number;
    OrdenDetail: any;
  };
  displayedColumns: string[] = [
    'Material',
    'Precio',
    'Cantidad',
    'Subtotal',
    'Acciones',
  ];
  Date: any;
  centerName: string;
  dataCustomer: any;
  dataCenter: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource = new MatTableDataSource<any>();

  constructor(
    private gService: GenericService,
    private orderservice: OrderService,
    private notify: NotificacionService,
    private router: Router,
    private miscService: MiscService
  ) {
    this.User = {
      Identification: null,
      Id: null,
      Name: null,
      Email: null,
      Phone: null,
    };
    this.Orden = {
      IdUser: 0,
      IdCenter: 0,
      Date: null,
      Total: 0,
      OrdenDetail: null,
    };
    this.Date = this.miscService.formatDate(Date.now());
    this.listarUsuarios();
    this.getCenter();
  }

  ngOnInit(): void {
    this.orderservice.currentDataOrden$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.total= this.orderservice.getTotal()
    });
    this.total = this.orderservice.getTotal();
    //this.orderservice.deleteCart()
  }

  //#region datos encabezado
  onUsuarioChange(userId: number) {
    this.findUser(userId);
  }

  findUser(Id: number) {
    this.gService
      .get('user', Id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.User.Id = response.Data.Id;
        this.User.Identification = response.Data.Identification;
        this.User.Email = response.Data.Email;
        this.User.Name = response.Data.Name;
        this.User.Phone = response.Data.Number;
      });
  }

  getCenter() {
    this.gService
      .get('center/user',  this.User.Id)
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

 
  //#endregion

  //#region detalle orden
  canjear(id: number, price: number, Name: string) {
    let detail = new OrdeDetail();
    detail.Name = Name;
    detail.Cantidad = 1;
    detail.MaterialId = id;
    detail.Price = price;
    detail.Subtotal = 0;
    console.log('Detalle Etrante', detail);
    this.orderservice.addToCart(detail);
    console.log('Detalles generados', this.orderservice.quantityItems());
  }

  actualizarCantidad(item: any) {
    this.orderservice.addToCart(item);
    this.total = this.orderservice.getTotal();
  }
  eliminarItem(item: any) {
    this.orderservice.removeFromOrder(item);
    this.total = this.orderservice.getTotal();
  }
  //#endregion

  submitM() {
    let details = this.orderservice.getItems;

    let detail = details.map((x) => ({
      ['MaterialId']: x.MaterialId,
      ['Subtotal']: x.Subtotal,
      ['Cantidad']: x.Cantidad,
    }));

    this.Orden.Date = new Date().toISOString();
    this.Orden.IdCenter = this.dataCenter.Id;
    this.Orden.IdUser = this.User.Id;
    this.Orden.Total = this.orderservice.getTotal();
    this.Orden.OrdenDetail = detail;

    console.log('DATA PRE POST ORDEN', this.Orden);

    this.gService
      .create('orden', this.Orden)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta

        console.log('CALLBACK API', data);
        this.notify.mensaje(  'Actualizar Material', `Orden creada`,TipoMessage.success);
        this.router.navigate(['/Dash/orden'])
      });

    
      
    this.orderservice.deleteCart();
  }
}
