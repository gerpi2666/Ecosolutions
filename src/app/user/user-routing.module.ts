import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../core/template/template.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../share/auth.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { IndexComponent1 } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  {
    path: 'Dash',
    component: TemplateComponent,
    children: [
      {
        path: 'user/dashboard',
        component: IndexComponent1,
        canActivate:[authGuard],
        data:{
          roles:['Administrador']
        }
        
      },
      {
        path:'user/profile',
        component: InfoComponent,
        canActivate:[authGuard],
        data:{
          roles:['Client']
        }
      },
      {
        path: 'user/adminProfile',
        component: DashboardAdminComponent,
        canActivate:[authGuard],
        data:{
          roles:['Administrador']
        }
      },
      {
        path :'user/create',
        component: CreateUserComponent,
        canActivate:[authGuard],
        data:{
          roles:['Administrador']
        }
      },
      {
        path :'user/update/:Id',
        component: CreateUserComponent,
        canActivate:[authGuard],
        data:{
          roles:['Administrador']
        }
      }

     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
