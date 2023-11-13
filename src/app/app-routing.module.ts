import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from 'src/app/material/index/index.component'
import { TemplateComponent } from './core/template/template.component';

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
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
