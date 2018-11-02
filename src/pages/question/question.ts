import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';


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
  seen:Array<Object> = [];
  succ:Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private mediaCapture: MediaCapture) {
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
  startRecording(){
    let options: CaptureVideoOptions = { quality: 0 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) =>{
          let file = new Blob([data],{"type" : "video\/mp4"});
          this.uploadVideo(this.questObjDisplay.technicalQuestionId,file,data[0]);
        },
        (err: CaptureError) => {
          console.error(err);
        }
      );
  }



  uploadVideo(qId,blob,media){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.saveVideoQuestion(this.candidate.positionCandidates.candidateLink,qId,blob)
    .then(data => {
      loading.dismiss();
      this.restProvider.showToast("Response saved successfully.","SUCCESS");
      this.saveResponse();
      console.log(media);
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  // deleteRecordedFile(path,filename){
  //   // var path = "file:///storage/emulated/0";
  //   // var filename = "myfile.txt";
  //    window.resolveLocalFileSystemURL(path, function(dir) {
  //        dir.getFile(filename, {create:false}, function(fileEntry) {
  //                  fileEntry.remove(function(){
  //                      // The file has been removed succesfully
  //                  },function(error){
  //                      // Error deleting the file
  //                  },function(){
  //                     // The file doesn't exist
  //                  });
  //        });
  //    });
  // }

  uploadTechnicalQuestion(flag){
    let mFlag = true;
    if(flag != undefined){
      mFlag = flag;
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var jsonData = {
      "questionId": this.questObjDisplay.technicalQuestionId,
      "questionType": this.questObjDisplay.type,
      "response": this.questObjDisplay.response
    }
    this.restProvider.saveTechnicalQuestion(this.candidate.positionCandidates.candidateLink,jsonData)
    .then(data => {
      loading.dismiss();
      this.restProvider.showToast("Response saved successfully.","SUCCESS");
      this.succ.push(this.questObjDisplay.no);
      if(mFlag){
        this.saveResponse();
      }
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  uploadAllTechnicalQuestion(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    let intrRes = [];
    let intrSkippedRes = [];
    Object.keys(this.questObj).forEach(key=> {
      if(this.questObj[key].type != "video"){
        if(this.questObj[key].response == undefined || this.questObj[key].response == ""){
          intrSkippedRes.push({
            'questionId': this.questObj[key].technicalQuestionId,
            'type': this.questObj[key].type
          });
        }else{
          intrRes.push({
            'questionId': this.questObj[key].technicalQuestionId,
            'response': this.questObj[key].response
          });
        }
      }
    });

    let jsonObject = {
      candidateInterviewResponseList:intrRes,
      candidateInterviewSkippedResponseList:intrSkippedRes
    }
    loading.present();
    this.restProvider.saveAllTechnicalQuestion(this.candidate.positionCandidates.candidateLink,jsonObject)
    .then(data => {
      loading.dismiss();
      this.restProvider.showToast("Response saved successfully, we will contact you soon.","SUCCESS");
      this.logout();
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  toggleClass(item){
    if(!item.qstatus){
        item.displayed = true;
        console.log(this.questObjDisplay);
      if(this.questObjDisplay.type != "video" && this.questObjDisplay.response != ''){
        this.uploadTechnicalQuestion(false);
      }else{
        this.seen.push(this.questObjDisplay.no);
      }
      item.qstatus = true;
      this.currentQues = item.no;
      this.questObjDisplay = this.questObj[this.currentQues];
      this.questObjDisplay.response = '';
      Object.keys(this.questions).forEach(key=> {
        if(item.no != this.questions[key].no){
          this.questions[key].qstatus = false;
        }
      });
    }
  }

  saveResponse(){
    if(this.currentQues == this.questions.length){
      return;
    }else{
      this.currentQues++;
    }
    this.questObjDisplay = this.questObj[this.currentQues];
    this.questObjDisplay.response = '';
    Object.keys(this.questions).forEach(key=> {
      if(this.currentQues == this.questions[key].no){
        this.questions[key].qstatus = true;
      }else{
        this.questions[key].qstatus = false;
      }
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
                  this.uploadAllTechnicalQuestion();
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
        this.questions[key].displayed = false;
        if(key == "0"){
          this.questions[key].qstatus = true;
        }else{
            this.questions[key].qstatus = false;
        }
        if(this.questObj[this.questions[key].no] == undefined){
            this.questObj[this.questions[key].no] = this.questions[key];
        }
      });

      this.questObjDisplay = this.questObj[1];
      this.questObjDisplay.response = '';
      this.questObjDisplay.qstatus = true;
      this.questObjDisplay.displayed = true;


    },error => {
        loading.dismiss();
        this.restProvider.showToast("Error for getting Interview Questions.","ERROR");
        console.log(error);
    });
  }
}
