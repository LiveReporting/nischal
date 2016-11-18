import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {DetailPage} from '../pages/detail/detail';
import {DataPage} from '../pages/data/data';
import { SaveData } from '../providers/save-data'
import {ViewDataPage} from '../pages/view-data/view-data';
import {SaveToMem} from '../providers/save-to-mem';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    ViewDataPage,
    DataPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    ViewDataPage,
    DataPage
  ],
  providers: [SaveData,SaveToMem]
})
export class AppModule {}
