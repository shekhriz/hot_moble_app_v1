import { Component } from '@angular/core';
import { ModalController,NavController,LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { RestProvider } from '../../providers/rest/rest';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:string='test@yopmail.com';
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
    .then(data => {
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
      // data.positionCandidates.candidateLink = 'da44b5f4-55bb-43ce-987a-c2e8368e5932';
      this.restProvider.setCandidate(data);
      this.navCtrl.push(RegisterPage);

    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
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
