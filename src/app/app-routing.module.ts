import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from 'src/app/material/index/index.component'
import {IndexCenterComponent} from './center/index/index.component'
import {CanjeComponent} from './change/canje/canje.component'


import { TemplateComponent } from './core/template/template.component';

const routes: Routes = [
 
  {
    path: '',
    component: TemplateComponent
    ,
    children: [
      {
        path: 'material',
        component: IndexComponent,
      },
      {
        path:'center',
        component: IndexCenterComponent,
      },
      {
        path:'canje',
        component: CanjeComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
