import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { HomePage } from '../home/home';
/**
 * Generated class for the GeneralQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general-question',
  templateUrl: 'general-question.html',
})
export class GeneralQuestionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralQuestionPage');
  }

  gotoQuestionPage(){
    this.navCtrl.push(QuestionPage);
  }
  logout(){
    this.navCtrl.push(HomePage);
  }

}
