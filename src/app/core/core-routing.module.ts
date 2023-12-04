import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';
import { InicioComponent } from '../home/inicio/inicio.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component:  InicioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
