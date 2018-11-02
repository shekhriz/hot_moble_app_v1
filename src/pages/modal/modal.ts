import { Component } from '@angular/core';
import { ViewController,IonicPage, NavController, NavParams,LoadingController,Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  code:string;
  reqId:string;
  candidateId:string;
  name:string;
  email:string;
  phone:string;
  subject:string;
  message:string;
  candidate:any;
  vid3:any;
  vid4:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public platform: Platform) {
      this.candidate = this.restProvider.getCandidate();
  }

  ionViewDidLoad() {
      this.code = this.navParams.get('code');
      this.platform.ready().then((readySource) => {
        this.vid3 = document.getElementById("myVideo3");
        this.vid4 = document.getElementById("myVideo4");
      });
  }

  closeModal(){
    this.platform.ready().then((readySource) => {
      if(this.vid3 != null){
        this.vid3.pause();
      }
      if(this.vid4 != null){
        this.vid4.pause();
      }
    });
    this.viewCtrl.dismiss();
  }

  savaData(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    if((this.name == undefined    || this.name == "")    ||
       (this.email == undefined   || this.email == "")   ||
       (this.phone == undefined   || this.phone == "")   ||
       (this.subject == undefined || this.subject == "") ||
       (this.message == undefined || this.message == "")) {
        this.restProvider.showToast("All fields are mandatory.","ERROR");
        return;
    }
    let jsonObj = {};
    if(this.candidate != null){
      jsonObj = {
         "id":0,
         "candidateId":this.candidate.candidates.candidateId,
         "candidateFirstName":this.name,
         "candidateLastName":"",
         "email":this.email,
         "phone":this.phone,
         "subject":this.subject,
         "message":this.message,
         "positionId":this.candidate.positionCandidates.positionId,
         "uniqueId":this.candidate.positionCandidates.candidateLink
      }
    }else{
      jsonObj = {
         "id":0,
         "candidateId":0,
         "candidateFirstName":this.name,
         "candidateLastName":"",
         "email":this.email,
         "phone":this.phone,
         "subject":this.subject,
         "message":this.message,
         "positionId":0,
         "uniqueId":"da44b5f4-55bb-43ce-987a-c2e8368e5932"
      }
    }


    // console.log(jsonObj);
    loading.present();
    this.restProvider.addFeedback(jsonObj)
    .then(data => {
      this.viewCtrl.dismiss();
      loading.dismiss();
      this.restProvider.showToast("Your feedback saved successfully, we will contact you soon.","SUCCESS");
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });

  }

}
