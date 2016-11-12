
import { Component, ViewChild, ElementRef , NgZone} from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {DetailPage} from '../detail/detail';
import {SaveData} from '../../providers/save-data';

declare var google;
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  public all_data = [];

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
              private platform: Platform,
              private saveData: SaveData,
              private zone: NgZone
            ) {
    // console.log("asdasd");\



  }
//
//   ionViewLoaded(){
//   this.loadMap();
// }
ionViewDidEnter(){
  this.loadData();
}
ionViewDidLoad() {
  // this.loadMap();
  this.platform.ready().then(() => {
          this.saveData.initDB();

          // console.log(this.data);
      });
  console.log("I'm alive!");

}
ionViewWillLeave() {
  console.log("Looks like I'm about to leave :(");
}
openDetails(){
  this.navCtrl.push(DetailPage);

}
loadData(){
  this.saveData.getAll()
        .then(data => {
            // console.log(data);
            this.zone.run(() => {
                this.all_data = data;
                // console.log(data);
                this.displayMarker(data) ;
            });
        })
        .catch(console.error.bind(console));
}
displayMarker(allData:any){
  Geolocation.getCurrentPosition().then((position) => {
    // console.log( posi/tion);

    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    var image = new google.maps.MarkerImage(
    '../../assets/icon/blue_map.png',
    new google.maps.Size(71, 71),
    new google.maps.Point(0, 0),
    new google.maps.Point(17, 34),
    new google.maps.Size(25, 25));
    let marker = new google.maps.Marker({
                 map: this.map,
                 animation: google.maps.Animation.DROP,
                 position: latLng,
                 icon: image
            });

            let infoWindow = new google.maps.InfoWindow({
                content: "Here You Are.!"
            });
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(this.map, marker);
            });
    for(let d of allData ){
      console.log(d);
      latLng={"lat": d.lat,"lng": d.lng};
      if(d.lat){
        // let latLng=new google.maps.LatLng(d.lat, d.lng);
          // let latLng = { lat: 12.97, lng: 77.59 };
          console.log(latLng);


          let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
          });
      }

        // marker.setMap(this.map);



    }

  }, (err) => {
    console.log(err);
  });

}

loadMap(){
  Geolocation.getCurrentPosition().then((position) => {
    // console.log( posi/tion);

    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // myLatLng = {lat: -25.363, lng: 131.044};
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // console.log(this.map);

  }, (err) => {
    console.log(err);
  });

}
addMarker(){
// let latLng = new google.maps.LatLng(lat, lang);
// let latLng = {"lat" : lat, "lng" : lang};
// let latLng = new google.maps.LatLng(lat, lang);

// console.log(latLng);

let marker = new google.maps.Marker({
  map: this.map,
  animation: google.maps.Animation.DROP,
  position: this.map.getCenter()
});

let content = "<h4>Information!</h4>";

// this.addInfoWindow(marker, content);


}
addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}

}
