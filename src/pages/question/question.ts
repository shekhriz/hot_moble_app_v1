import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  questionArray:number[] = [1,2,3,4,5];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
    console.log(this.questionArray);
  }

  logout(){
    this.navCtrl.push(HomePage);
  }

}
