import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {DetailPage} from '../pages/detail/detail';
import { SaveData } from '../providers/save-data'

/// <reference path="../../../typings/index.d.ts" />

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage

  ],
  providers: [SaveData]
})
export class AppModule {}
