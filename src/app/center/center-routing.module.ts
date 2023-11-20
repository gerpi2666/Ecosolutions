import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../core/template/template.component';
import { IndexCenterComponent } from './index/index.component';
import { CreateCenterComponent } from './create/create.component';

const routes: Routes = [
{
  path: 'Dash', component: TemplateComponent,
  children:[
    {
      path:'center',
      component: IndexCenterComponent,
    },
    {
      path:'center/create', component: CreateCenterComponent
    },
    {
      path:'center/update/:Id', component: CreateCenterComponent
    }
  ]

}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenterRoutingModule { }
