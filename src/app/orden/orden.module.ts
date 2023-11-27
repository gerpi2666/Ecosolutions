import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenRoutingModule } from './orden-routing.module';
import { IndexOrdenComponent } from './index-orden/index-orden.component';
import { DetailComponent } from './detail/detail.component';

import {MatInputModule} from "@angular/material/input"
import {MatSelectModule} from "@angular/material/select"
import {MatAutocompleteModule} from "@angular/material/autocomplete"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatMenuModule} from "@angular/material/menu"
import {MatIconModule} from "@angular/material/icon"
import {MatButtonModule} from "@angular/material/button"
import {MatBadgeModule} from "@angular/material/badge"
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatListModule} from "@angular/material/list"
import {MatCardModule} from "@angular/material/card"
import {MatSliderModule} from "@angular/material/slider"
import {MatTableModule} from "@angular/material/table"
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatSortModule} from "@angular/material/sort"
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatNativeDateModule} from "@angular/material/core"
import {MatRadioModule} from "@angular/material/radio"
import {MatCheckboxModule} from "@angular/material/checkbox"
import { MatGridListModule } from '@angular/material/grid-list'; 
import {MatDialogModule} from "@angular/material/dialog";
import { OrdenCenterComponent } from './orden-center/orden-center.component';
import { CreateOrdenComponent } from './create-orden/create-orden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexOrdenComponent,
    DetailComponent,
    OrdenCenterComponent,
    CreateOrdenComponent,
    
  ],
  imports: [
    CommonModule,
    OrdenRoutingModule,
    FormsModule,ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    
  ]
})
export class OrdenModule { }
