import { Component } from '@angular/core';
import { ModalController ,IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RateSkillsPage } from '../rate-skills/rate-skills';
import { ModalPage } from '../modal/modal';
import { RestProvider } from '../../providers/rest/rest';
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
  candidate:any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams,public modalCtrl : ModalController) {
        this.candidate = this.restProvider.getCandidate();
        console.log('--------candidate----------');
        console.log(this.candidate);
  }

  ionViewDidLoad() {
  }

  logout(){
    this.navCtrl.push(HomePage);
    this.restProvider.removeCandidate();
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
