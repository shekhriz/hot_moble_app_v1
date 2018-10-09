import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
    private param1 : string ;
    private param2 : string ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.param1 = this.navParams.get("param1");
        this.param2 = this.navParams.get("param2");

        console.log(this.param1);
        console.log(this.param2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  logout(){
    this.navCtrl.push('HomePage');
  }

}
