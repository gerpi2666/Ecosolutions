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
import { CajeDetailComponent } from './change/canje-detail/caje-detail.component';
import { ChangeModule } from './change/change.module';
import { ToastrModule } from 'ngx-toastr';

  @NgModule({
    declarations: [
      AppComponent,
      CajeDetailComponent
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      //material
      BrowserAnimationsModule,
      ToastrModule.forRoot(), 

      MaterialModule,
      //modulos
      CoreModule,
      ShareModule,
      HomeModule,
      CenterModule,
      //rutas
      AppRoutingModule,
      ChangeModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
