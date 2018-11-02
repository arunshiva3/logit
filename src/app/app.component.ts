import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {CommonUtilsService} from "./common/common-utils.service";

const config = {
  apiKey: 'AIzaSyB8tqJ-UOcQXghYmHSqcb0F4hcod7YCzj0',
  authDomain: 'logit-1.firebaseapp.com',
  databaseURL: 'https://logit-1.firebaseio.com',
  projectId: 'logit-1',
  storageBucket: 'logit-1.appspot.com',
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage:any = 'LoginPage';
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(private platform: Platform,private splashScreen: SplashScreen,private statusBar: StatusBar,
              private commonUtils: CommonUtilsService, private router: Router) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      document.addEventListener("backbutton", () => {
        // code that is executed when the user pressed the back button

        // this.commonUtils.presentToast("MESSAGE");
      });
    });

    firebase.initializeApp(config);
  }


  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/admin' || this.router.url === '/user' || this.router.url === '/login') {
        navigator['app'].exitApp(); // work in ionic 4
        /*if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          // this.platform.exitApp(); // Exit from app
          navigator['app'].exitApp(); // work in ionic 4

        } else {
          this.commonUtils.presentToast("In login Press back again to exit App.");
          this.lastTimeBackPress = new Date().getTime();
        }*/
      }
    });
  }
}
