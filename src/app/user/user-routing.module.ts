import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../core/template/template.component';
import { DashUsersComponent } from './dash-users/dash-users.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../share/auth.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: 'Dash',
    component: TemplateComponent,
    children: [
      {
        path: 'user/dashboard',
        component: DashUsersComponent,
        
      },
      {
        path:'user/profile',
        component: ProfileComponent
      },
      {
        path :'user/create',
        component: CreateUserComponent
      },
      {
        path :'user/update/:Id',
        component: CreateUserComponent
      },
      {
        path :'user/info',
        component: InfoComponent
      }

     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
