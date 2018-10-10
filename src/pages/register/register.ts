import { Component } from '@angular/core';
import { ModalController ,IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RateSkillsPage } from '../rate-skills/rate-skills';
import { ModalPage } from '../modal/modal';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl : ModalController) {
        this.param1 = this.navParams.get("param1");
        this.param2 = this.navParams.get("param2");
  }

  ionViewDidLoad() {
  }

  logout(){
    this.navCtrl.push(HomePage);
  }

  openModal(mCode){
    var data = {
      code : mCode
    };
    var modalPage = this.modalCtrl.create('ModalPage',data);
    modalPage.present();
  }

  gotoSkillsRatePage(){
    this.navCtrl.push(RateSkillsPage)
  }

}
