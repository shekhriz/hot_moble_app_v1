import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { RestProvider } from '../providers/rest/rest';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  candidate:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public restProvider: RestProvider,) {
    platform.ready().then(() => {
      this.candidate = this.restProvider.getCandidate();
      if(this.candidate != null){
        this.rootPage = RegisterPage;
      }else{
        this.rootPage = HomePage;
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
