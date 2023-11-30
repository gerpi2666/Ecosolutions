import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../core/template/template.component';
import { IndexCuponComponent } from './index-cupon/index-cupon.component';
import { CreateCuponComponent } from './create-cupon/create-cupon.component';
import { CuponUserIndexComponent } from './cupon-user-index/cupon-user-index.component';

const routes: Routes = [
{
  path: 'Dash', component: TemplateComponent,
  children:[
    {
      path:'cupon', component: IndexCuponComponent
    },
    {
      path:'cupon/mycupons', component: CuponUserIndexComponent
    },
    {
      path:'cupon/create', component:CreateCuponComponent
    },
    {
      path:'cupon/update/:Id', component: CreateCuponComponent
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuponRoutingModule { }
