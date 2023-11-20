import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from 'src/app/material/index/index.component'
import {IndexCenterComponent} from './center/index/index.component'



import { TemplateComponent } from './core/template/template.component';
import { IndexOrdenComponent } from './orden/index-orden/index-orden.component';
import { DetailComponent } from './orden/detail/detail.component';
import { OrdenCenterComponent } from './orden/orden-center/orden-center.component';
import { CreateComponent } from './material/create/create.component';
import { CreateCenterComponent } from './center/create/create.component';
import { LandingModule } from './landing/landing.module';
import { HomeLandingComponent } from './landing/home-landing/home-landing.component';

const routes: Routes = [
 
  {
    path: '',
    component: HomeLandingComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
