import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GeneralQuestionPage } from '../general-question/general-question';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the RateSkillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rate-skills',
  templateUrl: 'rate-skills.html',
})
export class RateSkillsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateSkillsPage');
  }

  logout(){
    this.navCtrl.push(HomePage);
    this.restProvider.removeCandidate();
  }

  gotoQuestionPage(){
    this.navCtrl.push(GeneralQuestionPage);
  }

}
