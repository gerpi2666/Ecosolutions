import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLandingComponent } from './landing/home-landing/home-landing.component';
import { LoginComponent } from './user/login/login.component';
import { InicioComponent } from './home/inicio/inicio.component';

const routes: Routes = [
 
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path:'login', component: LoginComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
