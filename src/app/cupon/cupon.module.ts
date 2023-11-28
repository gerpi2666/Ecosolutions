import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuponRoutingModule } from './cupon-routing.module';
import { CreateCuponComponent } from './create-cupon/create-cupon.component';
import { IndexCuponComponent } from './index-cupon/index-cupon.component';

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
import { DialogChangeComponent } from './dialog-change/dialog-change.component';


@NgModule({
  declarations: [
    CreateCuponComponent,
    IndexCuponComponent,
    DialogChangeComponent,
  ],
  imports: [
    CommonModule,
    CuponRoutingModule,
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
export class CuponModule { }
