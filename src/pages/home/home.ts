
import { Component, ViewChild, ElementRef , NgZone} from '@angular/core';
import { NavController,Platform ,Events} from 'ionic-angular';
import { Geolocation ,GoogleMap, GoogleMapsEvent, GoogleMapsMarkerOptions, GoogleMapsMarker,GoogleMapsLatLng } from 'ionic-native';
import {DetailPage} from '../detail/detail';
import {SaveData} from '../../providers/save-data';
import {ViewDataPage} from '../view-data/view-data';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})


export class HomePage {

  public all_data = [];
  home_views: string;
  map: GoogleMap;

  @ViewChild('map') mapElement: ElementRef;



  constructor(public navCtrl: NavController,
              private platform: Platform,
              private saveData: SaveData,
              private zone: NgZone,
              public events: Events
            ) {
    // console.log("asdasd");\
    this.home_views = "maps";
    events.subscribe('menu:opened', () => {
        // your action here
        // console.log("opened");
        this.map.setClickable(false);
    });

    events.subscribe('menu:closed', () => {
        // your action here
        // console.log("clodes");
        this.map.setClickable(true);

    });
  }

ionViewDidEnter(){
  console.log("entering");
    this.home_views="maps";
    this.loadMap();
    // this.loadData();
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


loadMap(){
  Geolocation.getCurrentPosition().then((position) => {
    let location = new GoogleMapsLatLng(position.coords.latitude,position.coords.longitude);

    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
    });


  });
    console.log('loading map');

}

displayMarker(allData:any){
    for(let d of allData ){
      console.log(d);
      let latLng = new GoogleMapsLatLng(d.lat,d.lng);
        // let latLng=new google.maps.LatLng(d.lat, d.lng);
          // let latLng = { lat: 12.97, lng: 77.59 };
          console.log(latLng);

          let markerOptions: GoogleMapsMarkerOptions = {
            position: latLng,
            title: d.question1
          };

          this.map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {
              marker.showInfoWindow();
            });

      }
    }

viewData(){
this.navCtrl.push(ViewDataPage);
  console.log("viewdata"+this.home_views);
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

}
