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

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      CoreModule,
      ShareModule,
      HomeModule,
      MaterialModule,
      CenterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
