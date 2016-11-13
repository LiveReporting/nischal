import { Component , NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import {DetailPage} from '../detail/detail';
import {SaveData} from '../../providers/save-data';

 /*
  Generated class for the ViewData page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-data',
  templateUrl: 'view-data.html'
})
export class ViewDataPage {
  home_views:String;
  public all_data = [];
  constructor(public navCtrl: NavController,
              private saveData: SaveData,
              public zone: NgZone
            ) {

              }

  ionViewDidLoad() {
    console.log('Hello ViewDataPage Page');
  }
  ionViewDidEnter(){
    this.home_views = "view-data";
    this.loadData();

  }
  openMaps(){
    // console.log('maps'+this.home_views);
    this.home_views ="maps";
    this.navCtrl.pop();

  }

  viewData(){
  // this.navCtrl.push(ViewDataPage);
  this.home_views = "view-data";
    // console.log("viewdata"+this.home_views);
  }

  loadData(){
    this.saveData.getAll()
          .then(data => {
            console.log("here");
              this.zone.run(() => {
                  this.all_data = data;
                  // console.log(data);
              });
          })
          .catch(console.error.bind(console));
  }

  openDetails(){
    this.navCtrl.push(DetailPage);
  }

}
