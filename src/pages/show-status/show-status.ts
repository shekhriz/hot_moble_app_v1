import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ShowStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-status',
  templateUrl: 'show-status.html',
})
export class ShowStatusPage {
  messageObj:any={};
  candidate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider) {
      this.messageObj = this.navParams.get('msg');
      this.candidate = this.restProvider.getCandidate();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowStatusPage');
  }

  finishInterview(){

    let jsonObject = {
      candidateInterviewResponseList:[],
      candidateInterviewSkippedResponseList:[]
    }
    this.restProvider.saveAllTechnicalQuestion(this.candidate.positionCandidates.candidateLink,jsonObject)
    .then(data => {
      this.logout();
    },error => {
      this.logout();
    });
  }

  logout(){
    this.navCtrl.push(HomePage);
    this.restProvider.removeCandidate();
  }

}
