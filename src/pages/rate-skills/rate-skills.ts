import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { QuestionPage } from '../question/question';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateSkillsPage');
  }

  logout(){
    this.navCtrl.push(HomePage);
  }

  gotoQuestionPage(){
    this.navCtrl.push(QuestionPage);
  }

}
