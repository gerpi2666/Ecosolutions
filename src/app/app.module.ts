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

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      //material
      BrowserAnimationsModule,
      MaterialModule,
      //modulos
      CoreModule,
      ShareModule,
      HomeModule,
      CenterModule,
      //rutas
      AppRoutingModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
