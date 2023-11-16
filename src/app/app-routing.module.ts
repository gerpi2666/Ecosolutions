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
        path:'orden',
        component: IndexOrdenComponent,
      },
      {
         path: 'orden/:id', 
        component: DetailComponent,
      },
      {
        path: 'orden/center/:id', 
       component:  OrdenCenterComponent,
      }    
      ,
      {
        path:'material/create', component: CreateComponent
      },
      {
        path:'material/update/:Id', component: CreateComponent
      },
      {
        path:'center/create', component: CreateCenterComponent
      },
      {
        path:'center/update/:Id', component: CreateCenterComponent
      }
    
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
