import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 

import { MaterialRoutingModule } from './material-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    MatCardModule
  ]
})
export class MaterialModule { }
