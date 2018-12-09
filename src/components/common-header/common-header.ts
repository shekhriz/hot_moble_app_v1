import { Component } from '@angular/core';
import { ModalController ,IonicPage, NavController, NavParams,AlertController,Platform  } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the CommonHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'common-header',
  templateUrl: 'common-header.html'
})
export class CommonHeaderComponent {

  vid1:any;
  vid2:any;

  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams,public modalCtrl : ModalController,
    public alertCtrl: AlertController,
    public platform: Platform) {
      this.platform.ready().then((readySource) => {
        this.vid1 = document.getElementById("myVideo1");
        this.vid2 = document.getElementById("myVideo2");
      });
  
  }

  logoutAlert() {
    this.platform.ready().then((readySource) => {
      if(this.vid1 != null){
        this.vid1.pause();
      }
      if(this.vid2 != null){
        this.vid2.pause();
      }
    });
    let alert = this.alertCtrl.create({
        title: 'Log-Out',
        message: 'Are you sure you want to Log-out ?',
        buttons: [
            {
                text: 'No',
                handler: () => {
                }
            },
            {
                text: 'Yes',
                handler: () => {
                  this.logout();
                }
            }
        ]
    });
    alert.present();
  }

  logout(){
    this.navCtrl.push(HomePage);
    this.restProvider.removeCandidate();
  }

}
