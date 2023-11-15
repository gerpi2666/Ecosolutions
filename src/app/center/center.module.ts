import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatMenuModule } from '@angular/material/menu';
import {MatDialogModule} from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
//import { MaterialRoutingModule } from './material-routing.module';
import { IndexCenterComponent } from './index/index.component';
import { DialogCenterComponent } from './dialog-center/dialog-center.component';
import { CreateCenterComponent } from './create/create.component';

import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    IndexCenterComponent,
    DialogCenterComponent,
    CreateCenterComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
  ]
})
export class CenterModule { }
