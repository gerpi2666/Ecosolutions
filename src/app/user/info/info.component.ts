import { Component, Inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  datos: any;
 
  destroy$: Subject<boolean> = new Subject<boolean>();

  
  constructor(
 
    private gService: GenericService
  ) {

  }

  
  ngOnInit(): void {
  
      this.obtenerUser();
    
  }

  obtenerUser() {
    this.gService
      .get('user', 4)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //console.log('Call back api',data.Data)
        this.datos = data.Data;
        //console.log('DATOS IN THE DIALOG', this.datos)
        console.log('DATOS',this.datos.Wallet)
      });

  }



}


