import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLandingComponent } from './landing/home-landing/home-landing.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
 
  {
    path: '',
    component: HomeLandingComponent,
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
