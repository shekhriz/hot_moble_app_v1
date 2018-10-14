import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
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
  questionArray:any = [
  {
    "no":1,
    "status":true,
    "id": 3501,
    "technicalQuestionId": 949,
    "questionName": "what is angular/angular js, please explain its features",
    "positionId": 564,
    "status": null,
    "type": "subjective",
    "option1": null,
    "option2": null,
    "option3": null,
    "option4": null,
    "option5": null,
    "option6": null,
    "answer": ""
  },
  {
    "no":2,
    "status":false,
    "id": 3502,
    "technicalQuestionId": 947,
    "questionName": "data analysis Q ?",
    "positionId": 564,
    "status": null,
    "type": "video",
    "option1": null,
    "option2": null,
    "option3": null,
    "option4": null,
    "option5": null,
    "option6": null,
    "answer": ""
  },
  {
    "no":3,
    "status":false,
    "id": 3503,
    "technicalQuestionId": 945,
    "questionName": "what is react native?",
    "positionId": 564,
    "status": null,
    "type": "subjective",
    "option1": null,
    "option2": null,
    "option3": null,
    "option4": null,
    "option5": null,
    "option6": null,
    "answer": ""
  },
  {
    "no":4,
    "status":false,
    "id": 3504,
    "technicalQuestionId": 943,
    "questionName": "Bootstrap types Q ?",
    "positionId": 564,
    "status": null,
    "type": "video",
    "option1": null,
    "option2": null,
    "option3": null,
    "option4": null,
    "option5": null,
    "option6": null,
    "answer": ""
  },
  {
    "no":5,
    "status":false,
    "id": 3505,
    "technicalQuestionId": 942,
    "questionName": "Aptitude entry level Q ?",
    "positionId": 564,
    "status": null,
    "type": "objective",
    "option1": "entry 1",
    "option2": "entry 2",
    "option3": "entry 3",
    "option4": "entry 4",
    "option5": null,
    "option6": null,
    "answer": ""
  },
  {
    "no":6,
    "status":false,
    "id": 3506,
    "technicalQuestionId": 938,
    "questionName": "What is DOT NET ?",
    "positionId": 564,
    "status": null,
    "type": "objective",
    "option1": "Framwork",
    "option2": "Library",
    "option3": "Programming Language",
    "option4": null,
    "option5": null,
    "option6": null,
    "answer": ""
  },
  {
    "no":7,
    "status":false,
    "id": 3507,
    "technicalQuestionId": 951,
    "questionName": "Object is instance of ?",
    "positionId": 564,
    "status": null,
    "type": "objective",
    "option1": "Class",
    "option2": "Function",
    "option3": "Variable",
    "option4": "Constant",
    "option5": null,
    "option6": null,
    "answer": ""
  },{
    "no":8,
    "status":false,
    "id": 3533,
    "technicalQuestionId": 947,
    "questionName": "Explain Mobile App developement?",
    "positionId": 564,
    "status": null,
    "type": "video",
    "option1": null,
    "option2": null,
    "option3": null,
    "option4": null,
    "option5": null,
    "option6": null,
    "answer": ""
  },{
    "no":9,
    "status":false,
    "id": 34513,
    "technicalQuestionId": 945,
    "questionName": "What is Object Oriented Technology in Java ?",
    "positionId": 564,
    "status": null,
    "type": "subjective",
    "option1": null,
    "option2": null,
    "option3": null,
    "option4": null,
    "option5": null,
    "option6": null,
    "answer": ""
  },{
    "no":10,
    "status":false,
    "id": 3503,
    "technicalQuestionId": 945,
    "questionName": "Write something about Agile Methodology?",
    "positionId": 564,
    "status": null,
    "type": "subjective",
    "option1": null,
    "option2": null,
    "option3": null,
    "option4": null,
    "option5": null,
    "option6": null,
    "answer": ""
  },
];
  questObj:any = {};
  questObjDisplay:any = {};
  currentQues:number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,
              public alertCtrl: AlertController) {

      Object.keys(this.questionArray).forEach(key=> {
        console.log(this.questionArray[key].no);
        if(this.questObj[this.questionArray[key].no] == undefined){
            this.questObj[this.questionArray[key].no] = this.questionArray[key];
        }
      });

      this.questObjDisplay = this.questObj[1];
      this.questObjDisplay.status = true;
  }

  ionViewDidLoad() {
  }

  logout(){
    this.navCtrl.push(HomePage);
    this.restProvider.removeCandidate();
  }

  // start video recording
  startRecording(){
    navigator.device.capture.captureVideo(
         (videoData) => {
             console.log('Video Recorded. Result: '+ JSON.stringify(videoData));
             //do something with videoData
         },
         (err) => {
           console.log('videoCaptureFail, err: ', err);
         },
         {
             limit: 1,
             duration: 60
         }
       );
  }
  toggleClass(item){
    if(!item.status){
      item.status = true;
      this.currentQues = item.no;
      this.questObjDisplay = this.questObj[this.currentQues];
      Object.keys(this.questionArray).forEach(key=> {
        if(item.no != this.questionArray[key].no){
          this.questionArray[key].status = false;
        }
      });
      console.log(this.questObj[this.currentQues-1]);
      if(this.currentQues > 1 && this.questObj[this.currentQues-1].type != "video"){
        this.restProvider.showToast("Response updated successfully.","SUCCESS");
      }
    }
  }

  saveResponse(){
    if(this.currentQues == this.questionArray.length){
      return;
    }else{
      this.currentQues++;
    }
    this.questObjDisplay = this.questObj[this.currentQues];
    Object.keys(this.questionArray).forEach(key=> {
      if(this.currentQues == this.questionArray[key].no){
        this.questionArray[key].status = true;
      }else{
        this.questionArray[key].status = false;
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
}
