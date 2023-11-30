  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { CoreModule } from './core/core.module';
  import { ShareModule } from './share/share.module';
  import { HomeModule } from './home/home.module';
  import { MaterialModule } from './material/material.module';
  import { CenterModule } from './center/center.module';
  import { HttpClientModule } from '@angular/common/http';
import { OrdenModule } from './orden/orden.module';
import { ToastrModule } from 'ngx-toastr';
import { LandingModule } from './landing/landing.module';
import { UserModule } from './user/user.module';
import { CuponModule } from './cupon/cupon.module';

  @NgModule({
    declarations: [
      AppComponent,

    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      //material
      BrowserAnimationsModule,
      ToastrModule.forRoot(), 
      UserModule,
      MaterialModule,
      //modulos
      CuponModule,
      CoreModule,
      ShareModule,
      HomeModule,
      CenterModule,
      //rutas
      AppRoutingModule,
      OrdenModule,
      LandingModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
