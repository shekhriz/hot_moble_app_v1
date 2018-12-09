import { Component } from '@angular/core';
import { Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SelectRequirementPage } from '../pages/select-requirement/select-requirement';
import { RegisterPage } from '../pages/register/register';
import { RestProvider } from '../providers/rest/rest';


@Component({
  templateUrl: 'app.html'  
})
export class MyApp {   
  rootPage:any;
  rowData:any;
  candidateData:any;  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public restProvider: RestProvider,  
    public alertCtrl: AlertController) { 
    platform.ready().then(() => {
      this.rowData = this.restProvider.getRowData();
      this.candidateData = this.restProvider.getCandidate();
      if(this.rowData != null){
        this.rootPage = SelectRequirementPage;
      }else{  
          if(this.candidateData != null){
            this.rootPage = RegisterPage;
          }else{
            this.rootPage = HomePage;
          }
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      platform.registerBackButtonAction(() => {
            const alert = this.alertCtrl.create({
                title: 'Close Application',
                message: 'Are you sure you want to close application?',
                buttons: [{
                    text: 'NO',
                    role: 'NO',
                    handler: () => {
                        console.log('Application exit prevented!');
                    }
                },{
                    text: 'YES',
                    handler: () => {
                        platform.exitApp();
                    }
                }]
            });
            alert.present();
        });
    });
  }
}
