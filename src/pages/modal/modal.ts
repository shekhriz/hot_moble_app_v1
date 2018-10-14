import { Component } from '@angular/core';
import { ViewController,IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,public restProvider: RestProvider,
    public loadingCtrl: LoadingController) {
      this.candidate = this.restProvider.getCandidate();
  }

  ionViewDidLoad() {
      this.code = this.navParams.get('code');
  }

  closeModal(){
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

    if(this.candidate != null){
      let jsonObj = {
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
      let jsonObj = {
         "id":0,
         "candidateId":0,
         "candidateFirstName":this.name,
         "candidateLastName":"",
         "email":this.email,
         "phone":this.phone,
         "subject":this.subject,
         "message":this.message,
         "positionId":0,
         "uniqueId":"test"
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
