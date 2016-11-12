
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {DetailPage} from '../detail/detail';


declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController) {
    console.log("asdasd");
  }
//
//   ionViewLoaded(){
//   this.loadMap();
// }

ionViewDidLoad() {
  console.log("I'm alive!");
  this.loadMap();
}
ionViewWillLeave() {
  console.log("Looks like I'm about to leave :(");
}
openDetails(){
  this.navCtrl.push(DetailPage);

}
  loadMap(){
    Geolocation.getCurrentPosition().then((position) => {
      console.log( position);

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      console.log(this.map);

    }, (err) => {
      console.log(err);
    });

  }

}
