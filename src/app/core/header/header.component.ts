
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAutenticated: boolean;
  currentUser: any;
  qtyItems:Number = 0;
  constructor(
    private router: Router,
    private authService: AuthenticationService) {      
     
  }

  ngOnInit(): void {
    //valores de prueba
     /*  this.isAutenticated = false;
      let user={
        name:"Gabriel García",
        email:"ggarcia@prueba.com",
 
      }
      this.currentUser=user;  */  
     //Suscripción a la información del usuario actual
     this. authService.decodeToken.subscribe((user:any)=>(
       this.currentUser=user
     ))
     //Suscripción al booleano que indica si esta autenticado
     this.authService.isAuthenticated.subscribe((valor)=>(
       this.isAutenticated=valor
     ))
   
   }
  login(){
    this.router.navigate(['login']);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['inicio']);
  }

}
