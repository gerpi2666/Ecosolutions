import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from '../core/template/template.component';
import { IndexOrdenComponent } from './index-orden/index-orden.component';
import { DetailComponent } from './detail/detail.component';
import { OrdenCenterComponent } from './orden-center/orden-center.component';
import { CreateOrdenComponent } from './create-orden/create-orden.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [
  {
    path: 'Dash', component: TemplateComponent,
    children:[
      {
        path:'orden',
        component: IndexOrdenComponent,
        canActivate:[authGuard],
        data:{
          roles:['AdminCenter','Administrador']
        }
      },
      
      {
        path:'orden/create', component: CreateOrdenComponent,
        canActivate:[authGuard],
        data:{
          roles:['AdminCenter','Administrador']
        }

      },
      {
         path: 'orden/:id', 
        component: DetailComponent,
      },
     
      {
        path: 'orden/center/:id', 
       component:  OrdenCenterComponent,
      }    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenRoutingModule { }
