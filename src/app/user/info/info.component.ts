import { Component, Inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { AuthenticationService } from '../../share/authentication.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  datos: any;
  currentUser:any
  destroy$: Subject<boolean> = new Subject<boolean>();

  
  constructor(
 
    private gService: GenericService,
    private authService: AuthenticationService
  ) {

  }

  
  ngOnInit(): void {
  
     
      this. authService.decodeToken.subscribe((user:any)=>(
        this.currentUser=user
      ))
      this.obtenerUser();
  }

  obtenerUser() {
    this.gService
      .get('user',this.currentUser.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //console.log('Call back api',data.Data)
        this.datos = data.Data;
        //console.log('DATOS IN THE DIALOG', this.datos)
        console.log('DATOS',this.datos.Wallet)
      });

  }



}


