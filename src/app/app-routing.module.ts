import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  IndexComponent } from './material/index/index.component';

const routes: Routes = [
  {
    path: 'material', component:  IndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
