import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { TemplateComponent } from '../core/template/template.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [
  {
    path: 'Dash', component: TemplateComponent,
    children:[
      {
        path: 'material', component: IndexComponent,
      },
      {
        path:'material/create', component: CreateComponent,
        canActivate:[authGuard],
        data:{
          roles:['Administrador']
        }
      },
      {
        path:'material/update/:Id', component: CreateComponent,
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
export class MaterialRoutingModule { }
