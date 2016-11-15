import { Component } from '@angular/core';
import { NavController, NavParams,  } from 'ionic-angular';
import {DetailPage} from '../detail/detail';

/*
  Generated class for the Data page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-data',
  templateUrl: 'data.html'
})
export class DataPage {
 data;
 formQues;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {


  }

  ionViewDidEnter() {
    console.log(this.navParams.get('edit_data'));
    this.data = this.navParams.get('edit_data');
    this.formQues = Object.keys(this.data);
  }

  editData(item){
    this.navCtrl.push(DetailPage,{edit_data:item});
  }
}
