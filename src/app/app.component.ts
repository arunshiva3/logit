import { Component } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
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
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {

    this.platform.backButton.subscribe(() => {

    })
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    firebase.initializeApp(config);
  }

  ngOnInit() {
    // this.platform.
  }
}
