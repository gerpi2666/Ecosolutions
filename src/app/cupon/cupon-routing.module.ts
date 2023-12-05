import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../core/template/template.component';
import { IndexCuponComponent } from './index-cupon/index-cupon.component';
import { CreateCuponComponent } from './create-cupon/create-cupon.component';
import { CuponUserIndexComponent } from './cupon-user-index/cupon-user-index.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [
{
  path: 'Dash', component: TemplateComponent,
  children:[
    {
      path:'cupon', component: IndexCuponComponent,
      canActivate:[authGuard],
      data:{
        roles:['Client','Administrador']
      }
    },
    {
      path:'cupon/mycupons', component: CuponUserIndexComponent,
      canActivate:[authGuard],
      data:{
        roles:['Client']
      }
    },
    {
      path:'cupon/create', component:CreateCuponComponent,
      canActivate:[authGuard],
      data:{
        roles:['Administrador']
      }
    },
    {
      path:'cupon/update/:Id', component: CreateCuponComponent,
      canActivate:[authGuard],
      data:{
        roles:['Administrador']
      }
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuponRoutingModule { }
