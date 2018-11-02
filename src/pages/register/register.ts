import { Component } from '@angular/core';
import { ModalController ,IonicPage, NavController, NavParams,AlertController,Platform  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RateSkillsPage } from '../rate-skills/rate-skills';
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
  vid1:any;
  vid2:any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams,public modalCtrl : ModalController,
  public alertCtrl: AlertController,
  public platform: Platform) {
        this.candidate = this.restProvider.getCandidate();
  }

  ionViewDidLoad() {
    this.platform.ready().then((readySource) => {
      this.vid1 = document.getElementById("myVideo1");
      this.vid2 = document.getElementById("myVideo2");
    });
  }

  logout(){
    this.navCtrl.push(HomePage);
    this.restProvider.removeCandidate();
  }

  openModal(mCode){
    this.platform.ready().then((readySource) => {
      if(this.vid1 != null){
        this.vid1.pause();
      }
      if(this.vid2 != null){
        this.vid2.pause();
      }
    });

    var data = {
      code : mCode
    };
    var modalPage = this.modalCtrl.create('ModalPage',data);
    modalPage.present();
  }

  gotoSkillsRatePage(){
    this.platform.ready().then((readySource) => {
      if(this.vid1 != null){
        this.vid1.pause();
      }
      if(this.vid2 != null){
        this.vid2.pause();
      }
    });
    this.navCtrl.push(RateSkillsPage);
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

}
