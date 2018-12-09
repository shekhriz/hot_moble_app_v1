import { Component } from '@angular/core';
import { ModalController ,IonicPage, NavController, NavParams,AlertController,Platform  } from 'ionic-angular';
import { GeneralQuestionPage } from '../general-question/general-question';
import { QuestionPage } from '../question/question';
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
        console.log(this.candidate);
  }

  ionViewDidLoad() {
    this.platform.ready().then((readySource) => {
      this.vid1 = document.getElementById("myVideo1");
      this.vid2 = document.getElementById("myVideo2");
    }); 
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
    this.selectNextRoute();
  }

  selectNextRoute(){
    this.restProvider.getInterviewStatus(this.candidate.positionCandidates.candidateLink)
    .then((status:any) => {
      if(status == null || status == "general" || status == "new"){
         this.navCtrl.push(GeneralQuestionPage);
      }else if(status == "skills"){
        this.navCtrl.push(RateSkillsPage);
      }else if(status == "technical"){
        this.navCtrl.push(QuestionPage);
      }
    },error => {
        console.log(error);
    });
  }
}
