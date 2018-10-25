import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
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
  candidate:any;
  questions:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      this.candidate = this.restProvider.getCandidate();
      this.getGenaralQuestions(this.candidate.positionCandidates.candidateLink);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralQuestionPage');
  }

  gotoQuestionPage(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    let intrRes = [];
    let intrSkippedRes = [];
    Object.keys(this.questions).forEach(key=> {
      if(this.questions[key].response == ""){
        intrSkippedRes.push({
          'questionId': this.questions[key].generalQuestionId,
          'type': this.questions[key].type
        });
      }else{
        intrRes.push({
          'questionId': this.questions[key].generalQuestionId,
          'response': this.questions[key].response
        });
      }
    });

    let jsonObject = {
      candidateInterviewResponseList:intrRes,
      candidateInterviewSkippedResponseList:intrSkippedRes
    }

    loading.present();
    this.restProvider.saveGenaralQuestions(this.candidate.positionCandidates.candidateLink,jsonObject)
    .then(data => {
      loading.dismiss();
      this.restProvider.showToast("Response saved successfully.","SUCCESS");
      this.navCtrl.push(QuestionPage);
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }


  logout(){
    this.navCtrl.push(HomePage);
    this.restProvider.removeCandidate();
  }

  getGenaralQuestions(uniqueId){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.restProvider.getGenaralQuestions(uniqueId)
    .then(data => {
      loading.dismiss();
      this.questions = [];
      Object.keys(data).forEach(key=> {
          data[key].response = '';
          this.questions.push(data[key]);
      });
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Error for getting Interview status.","ERROR");
        console.log(error);
    });
  }
  logoutAlert() {
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
