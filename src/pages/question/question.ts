import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
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
  questions:any;
  candidate:any;
  questObj:any = {};
  questObjDisplay:any = {};
  currentQues:number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
                this.candidate = this.restProvider.getCandidate();
                this.getTechnicalQuestions(this.candidate.positionCandidates.candidateLink);
  }

  ionViewDidLoad() {
  }

  logout(){
    this.navCtrl.push(HomePage);
    this.restProvider.removeCandidate();
  }

  // start video recording
  // startRecording(){
  //   navigator.device.capture.captureVideo(
  //        (videoData) => {
  //            console.log('Video Recorded. Result: '+ JSON.stringify(videoData));
  //            //do something with videoData
  //        },
  //        (err) => {
  //          console.log('videoCaptureFail, err: ', err);
  //        },
  //        {
  //            limit: 1,
  //            duration: 60
  //        }
  //      );
  // }
  toggleClass(item){
    if(!item.qstatus){
      item.qstatus = true;
      this.currentQues = item.no;
      this.questObjDisplay = this.questObj[this.currentQues];
      Object.keys(this.questions).forEach(key=> {
        if(item.no != this.questions[key].no){
          this.questions[key].qstatus = false;
        }
      });
      console.log(this.questObj[this.currentQues-1]);
      if(this.currentQues > 1 && this.questObj[this.currentQues-1].type != "video"){
      }
    }
  }

  saveResponse(){
    if(this.currentQues == this.questions.length){
      return;
    }else{
      this.currentQues++;
    }
    this.questObjDisplay = this.questObj[this.currentQues];
    Object.keys(this.questions).forEach(key=> {
      if(this.currentQues == this.questions[key].no){
        this.questions[key].qstatus = true;
      }else{
        this.questions[key].qstatus = false;
      }
    });

    if(this.questObj[this.currentQues-1].type != "video"){
      this.restProvider.showToast("Response updated successfully.","SUCCESS");
    }
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

  finishInterview() {
    let alert = this.alertCtrl.create({
        title: 'Finish Interview.',
        message: 'Are you sure you want to finish your interview ?',
        buttons: [
            {
                text: 'No',
                handler: () => {
                }
            },
            {
                text: 'Yes',
                handler: () => {
                  this.restProvider.showToast("Response saved successfully, we will contact you soon.","SUCCESS");
                  this.logout();
                }
            }
        ]
    });
    alert.present();
  }

  getTechnicalQuestions(uniqueId){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.restProvider.getTechnicalQuestions(uniqueId)
    .then(data => {
      loading.dismiss();
      this.questions = data;

      Object.keys(this.questions).forEach(key=> {
        this.questions[key].no = parseInt(key)+1;
        if(key == 0){
          this.questions[key].qstatus = true;
        }else{
            this.questions[key].qstatus = false;
        }
        if(this.questObj[this.questions[key].no] == undefined){
            this.questObj[this.questions[key].no] = this.questions[key];
        }
      });

      this.questObjDisplay = this.questObj[1];
      this.questObjDisplay.qstatus = true;


    },error => {
        loading.dismiss();
        this.restProvider.showToast("Error for getting Interview Questions.","ERROR");
        console.log(error);
    });
  }
}
