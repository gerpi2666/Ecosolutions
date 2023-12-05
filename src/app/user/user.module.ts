import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { DashUsersComponent } from './dash-users/dash-users.component';
import { ProfileComponent } from './profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

import { MatSelectModule } from '@angular/material/select';

import { MatRadioModule } from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatDialogModule} from "@angular/material/dialog";


import { LayoutModule } from '@angular/cdk/layout';
import { IndexComponent1 } from './index/index.component';
import { MatTableModule } from '@angular/material/table';
import { CreateUserComponent } from './create-user/create-user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterComponent } from './register/register.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [
    LoginComponent,
    DashUsersComponent,
    ProfileComponent,
    IndexComponent1,
    CreateUserComponent,
    RegisterComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,MatIconModule,
    LayoutModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  exports: [
    IndexComponent1,
    InfoComponent
  ]
})
export class UserModule { }
