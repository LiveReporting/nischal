import { Component , ViewChild} from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { DetailPage} from '../pages/detail/detail';
import { ViewDataPage} from '../pages/view-data/view-data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;
  constructor(public platform: Platform,
              public events: Events) {
    this.pages = [
      {title: 'Home',component: HomePage},
      {title: 'Collect Data',component: DetailPage},
      {title: 'View Data',component: ViewDataPage}

    ];
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  menuClosed() {
    this.events.publish('menu:closed', '');
  }

  menuOpened() {
      this.events.publish('menu:opened', '');
  }
}
