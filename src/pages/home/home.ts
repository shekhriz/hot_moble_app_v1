import { Component } from '@angular/core';
import { ModalController,NavController,LoadingController } from 'ionic-angular';
import { SelectRequirementPage } from '../select-requirement/select-requirement';
import { RestProvider } from '../../providers/rest/rest';
import { ShowStatusPage } from '../show-status/show-status';
import { RegisterPage } from '../register/register';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:string;
  emailBKP:string;
  otp:string;
  isOTP:boolean = false;
  constructor(public navCtrl: NavController,public restProvider: RestProvider,public loadingCtrl: LoadingController,
    public modalCtrl : ModalController) {
  }

  genarateOTP(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if(this.email == undefined || this.email == ""){
      this.restProvider.showToast("Please enter email address.","ERROR");
      return;
    }
    if(!this.emailValidate(this.email)){
      this.restProvider.showToast("Email address is not valid.","ERROR");
      return;
    }

    loading.present();
    this.restProvider.getOTP(this.email)
    .then(data => {
      this.isOTP = true;
      this.emailBKP = this.email;
      this.email = "";
      loading.dismiss();
      this.restProvider.showToast("OTP has been sent successfully to registered email.","SUCCESS");
      // console.log(data);
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  reGenarateOTP(){
    this.isOTP = false;
    this.otp = "";
    this.email = "";
    this.emailBKP = "";
  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    if(this.otp == undefined || this.otp == ""){
      this.restProvider.showToast("Please enter OTP.","ERROR");
      return;
    }

    loading.present();
    let jsonData = {
      "emailId": this.emailBKP,
      "id": 0,
      "otp": parseInt(this.otp)
    }

    this.restProvider.verifyOTP(jsonData)
    .then((data:any) => {
      loading.dismiss();
      if(data == "Email doesn't exist"){
        this.restProvider.showToast("Candidate is not associated with us.","ERROR");
        return
      }

      if(data == "Error"){
        this.restProvider.showToast("Please enter valid OTP.","ERROR");
        return
      }

      this.isOTP = false;
      this.otp = "";

      if(data.candidates.candidateId == null && data.reqDetailsForApp.length == 0){
        this.restProvider.showToast("Sorry you are not associated with us.","ERROR");
        return
      }

      if(data.reqDetailsForApp.length == 1){
        let JsonData = {
          'reqDetailsForApp'      :  data.reqDetailsForApp[0],
          'candidates'            :  data.candidates,
          'positionCandidates'    :  data.positionCandidates[0],
          'requirementDetailsBean':  data.requirementDetailsBean[0]
        }
        this.getInterviewDetails(JsonData.positionCandidates.candidateLink,JsonData);
      }else{
        this.restProvider.setRowData(data);
        this.navCtrl.push(SelectRequirementPage);
      }
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  getInterviewDetails(uniqueId,JsonData){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getInterviewDetails(uniqueId)
    .then((candidateProperty:any) => {
      this.restProvider.getInterviewValidity(uniqueId)
        .then((response:any) => {
          loading.dismiss();
          if(response.candidateEnableDisable=='Enable'){
            if(response.status=='Open'){
                if(candidateProperty.linkValidity=='Active'){
                  this.restProvider.setCandidate(JsonData);
                  this.navCtrl.push(RegisterPage);
                }else if(candidateProperty.linkValidity=='InActive'){
                    if(candidateProperty.linkExpired == "true"){
                        let toast = {
                          reqName: JsonData.reqDetailsForApp.jobTitle,
                          status : 'interviewLinkExpired'
                        }
                        this.navCtrl.push(ShowStatusPage,{msg:toast});
                    }else{
                        let toast = {
                          reqName: JsonData.reqDetailsForApp.jobTitle,
                          status : 'alreadyGivenInterview'
                        }
                        this.navCtrl.push(ShowStatusPage,{msg:toast});
                    }
                }
            }else if(response.status=='Closed'){
                let toast = {
                  reqName: JsonData.reqDetailsForApp.jobTitle,
                  status : 'requirementClosed'
                }
                this.navCtrl.push(ShowStatusPage,{msg:toast});
            }
          }else{
            let toast = {
              reqName: JsonData.reqDetailsForApp.jobTitle,
              status : 'candidateRemoved'
            }
            this.navCtrl.push(ShowStatusPage,{msg:toast});
          }

        },error => {
            console.log(error);
            loading.dismiss();
            this.restProvider.showToast("Something went wrong","ERROR");
        });
    },error => {
        console.log(error);
        loading.dismiss();
        this.restProvider.showToast("Something went wrong","ERROR");
    });
  }

   emailValidate(email) {
     let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) == false){
          return false;
      }
      return true;
  }

  connectUs(mCode){
    var data = {
      code : mCode
    };
    var modalPage = this.modalCtrl.create('ModalPage',data);
    modalPage.present();
  }

}
