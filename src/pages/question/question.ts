import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ShowStatusPage } from '../show-status/show-status';
import { RestProvider } from '../../providers/rest/rest';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';



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
              private mediaCapture: MediaCapture,
              public modalCtrl : ModalController,
              private transfer: FileTransfer,
              private file: File) {
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
      .then((data: MediaFile[]) =>{
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
          let capturedVid:any = data[0];
          let localVideoPath = capturedVid.fullPath;
          let directoryPath = localVideoPath.substr(0, localVideoPath.lastIndexOf('/'));
          let fileName = localVideoPath.substr(localVideoPath.lastIndexOf('/') + 1); 
          this.file.readAsArrayBuffer(directoryPath, fileName).then((result) => {
            let blob = new Blob([result], { type: "video/mp4" });
            //then upload the blob to server storage
         
          this.restProvider.saveVideoQuestion(this.candidate.positionCandidates.candidateLink,this.questObjDisplay.id,blob)
          .then(data => {
            this.questObjDisplay.solved = true;
            this.succ.push(this.questObjDisplay.no);
            loading.dismiss();
            this.restProvider.showToast("Response saved successfully.","SUCCESS");
            this.saveResponse();
          },error => {
              loading.dismiss();
              this.restProvider.showToast("Something went wrong.","ERROR");
              console.log(error);
          });
          });
        },
        (err: CaptureError) => {
          console.error(err);
        } 
      ); 
  }

  // upload(fileData,uniqueId,qId) {
  //   console.log(fileData);
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   let options: FileUploadOptions = {
  //      fileKey: 'file',
  //      fileName: fileData.name,
  //      mimeType:fileData.type,
  //      headers: {
  //       Connection: "close"
  //      }
  //   }
  //   let apiUrl = 'https://qa.hookedontalent.com/hotlab/user/uploadVideoFromMobile/'+uniqueId+'/'+qId;
  //   fileTransfer.upload(fileData.fullPath, apiUrl, options)
  //    .then((data) => {
  //      // success 
  //      console.log(data);
  //    }, (err) => {
  //      // error
  //      console.log(err);
  //    })
  // }

  uploadVideo(qId,blob){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.saveVideoQuestion(this.candidate.positionCandidates.candidateLink,qId,blob)
    .then(data => {
      console.log(data);
      loading.dismiss();
      this.restProvider.showToast("Response saved successfully.","SUCCESS");
      this.saveResponse();
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

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
      "questionId": this.questObjDisplay.id,
      "questionType": this.questObjDisplay.type,
      "response": this.questObjDisplay.response  
    }
    this.restProvider.saveTechnicalQuestion(this.candidate.positionCandidates.candidateLink,jsonData)
    .then(data => {
      this.questObjDisplay.solved = true;
      this.succ.push(this.questObjDisplay.no);
      loading.dismiss();
      this.restProvider.showToast("Response saved successfully.","SUCCESS");
      if(mFlag){  
        this.saveResponse();
      }
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  uploadTechnicalQuestionFromToggle(data){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...' 
    });
    loading.present();
    var jsonData = {
      "questionId": data.id,
      "questionType": data.type,
      "response": data.response  
    }
    this.restProvider.saveTechnicalQuestion(this.candidate.positionCandidates.candidateLink,jsonData)
    .then(data => {
      loading.dismiss();
      this.restProvider.showToast("Response saved successfully.","SUCCESS");
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
            'questionId': this.questObj[key].id,
            'type': this.questObj[key].type
          });
        }else{
          intrRes.push({
            'questionId': this.questObj[key].id,
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
        console.log('previous que:',this.questObjDisplay);
        this.seen.push(this.questObjDisplay.no);
      if(this.questObjDisplay.type != "video" && this.questObjDisplay.response != ''){
        this.questObjDisplay.solved = true;
        this.succ.push(this.questObjDisplay.no);
        this.uploadTechnicalQuestionFromToggle(this.questObjDisplay);
      }else{
      } 
        
      item.qstatus = true;
      this.currentQues = item.no; 
      this.questObjDisplay = this.questObj[this.currentQues];
      this.questObjDisplay.response = '';  
      console.log('current que: ',this.questObjDisplay);
      if(this.questObjDisplay.type == "video" && !this.questObjDisplay.solved){ 
        this.videoRecordingTimer(this.questObjDisplay.questionName);
      }
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
    if(this.questObjDisplay.type == 'video' && !this.questObjDisplay.solved){ 
      this.videoRecordingTimer(this.questObjDisplay.questionName);  
    }
    Object.keys(this.questions).forEach(key=> {
      if(this.currentQues == this.questions[key].no){
        this.questions[key].qstatus = true;
      }else{
        this.questions[key].qstatus = false;
      }
    });
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

  videoRecordingTimer(quest) {
    var modalPage = this.modalCtrl.create('VideoTimerModalPage', {text:quest}, {
      cssClass:"my-modal",
      showBackdrop:true,
      enableBackdropDismiss:false
    });
    modalPage.onDidDismiss(data => {
      if(data == "START-RECORDING"){
        this.startRecording();
      }
    });
    modalPage.present();
  }

  getTechnicalQuestions(uniqueId){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.restProvider.getTechnicalQuestions(uniqueId)
    .then((data:any) => {
      loading.dismiss();
      if(data.length == 0){
        let toast = {
          reqName: 'Finish interview',
          status : 'FINISH-INTERVIEW'
        }
        this.navCtrl.push(ShowStatusPage,{msg:toast});
        return;
      }
      this.questions = data;

      Object.keys(this.questions).forEach(key=> {
        this.questions[key].no = parseInt(key)+1;
        this.questions[key].displayed = false;  
        this.questions[key].solved = false;  
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
      if(this.questObjDisplay.type == 'video' && !this.questObjDisplay.solved){ 
        this.videoRecordingTimer(this.questObjDisplay.questionName);  
      }

    },error => {
        loading.dismiss();
        this.restProvider.showToast("Error for getting Interview Questions.","ERROR");
        console.log(error);
    });
  }
}
