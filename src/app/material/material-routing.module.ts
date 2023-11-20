import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { TemplateComponent } from '../core/template/template.component';

const routes: Routes = [
  {
    path: 'Dash', component: TemplateComponent,
    children:[
      {
        path: 'material', component: IndexComponent,
      },
      {
        path:'material/create', component: CreateComponent
      },
      {
        path:'material/update/:Id', component: CreateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
