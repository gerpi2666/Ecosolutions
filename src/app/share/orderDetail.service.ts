import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class OrdeDetail {
  Name: string;  
  MaterialId: number;
  Price: number;
  Cantidad: any;
  Subtotal: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private order = new BehaviorSubject<OrdeDetail[]>(null);
  public currentDataOrden$ = this.order.asObservable();

  public qtyItems = new Subject<number>();

  constructor() {
    this.order = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('orden'))
    );

    this.currentDataOrden$ = this.order.asObservable();
  }

  saveOrd(): void {
    localStorage.setItem('orden', JSON.stringify(this.order.getValue()));
  }

  addToCart(ordDetail: any) {
    //debugger
    const newItem = new OrdeDetail();
    newItem.Name= ordDetail.Name
    newItem.MaterialId = ordDetail.MaterialId 
    newItem.Price = ordDetail.Price;
    newItem.Cantidad = ordDetail.Cantidad;
    newItem.Subtotal = this.calculoSubtotal(newItem);

    let listCart = this.order.getValue();
    if (listCart) {
      let objIndex = listCart.findIndex(
        (obj) => obj.MaterialId == newItem.MaterialId
      );
      if (objIndex != -1) {
        if (ordDetail.hasOwnProperty('Cantidad')) {
          if (ordDetail.Cantidad <= 0) {
            this.removeFromOrder(newItem);
            return;
          } else {
            listCart[objIndex].Cantidad = ordDetail.Cantidad;
          }
        } else {
          listCart[objIndex].Cantidad += 1;
        }
        newItem.Cantidad = listCart[objIndex].Cantidad;
        listCart[objIndex].Subtotal = this.calculoSubtotal(newItem);
      } else {
        listCart.push(newItem);
      }
    } else {
      listCart = [];
      listCart.push(newItem);
    }
    this.order.next(listCart);
    this.qtyItems.next(this.quantityItems());
    this.saveOrd();
  }

  public removeFromOrder(newData: OrdeDetail) {
    let listCart = this.order.getValue();
    let objIndex = listCart.findIndex(
      (obj) => obj.MaterialId == newData.MaterialId
    );
    if (objIndex != -1) {
      listCart.splice(objIndex, 1);
    }
    this.order.next(listCart);
    this.qtyItems.next(this.quantityItems());
    this.saveOrd();
  }

  private calculoSubtotal(item: OrdeDetail) {
    return item.Price * item.Cantidad;
  }

  get getItems() {
    
    return this.order.getValue();
  }
  //

  get countItems(): Observable<number> {
    this.qtyItems.next(this.quantityItems());
    return this.qtyItems.asObservable();
  }

  quantityItems() {
    let listCart = this.order.getValue();
    let sum = 0;
    if (listCart != null) {
      //Sumando las cantidades de cada uno de los items del carrito
      listCart.forEach((obj) => {
        sum += obj.Cantidad;
      });
    }
    return sum;
  }

  public getTotal(): number {
    let total = 0;
    let listCart = this.order.getValue();
    if (listCart != null) {
      //Sumando los subtotales de cada uno de los items del carrito

      listCart.forEach((item: OrdeDetail, index) => {
        total += item.Subtotal;
      });
    }

    return total;
  }

  public deleteCart() {
    this.order.next(null);
    this.qtyItems.next(0);
    this.saveOrd();
  }
}
