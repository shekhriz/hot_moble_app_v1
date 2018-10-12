import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:string;
  otp:string;
  isOTP:boolean = false;
  constructor(public navCtrl: NavController,public restProvider: RestProvider,public loadingCtrl: LoadingController) {
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
    let jsonData = {
      emailId:this.email
    }
    this.restProvider.getOTP(jsonData)
    .then(data => {
      this.isOTP = true;
      this.email = "";
      loading.dismiss();
      this.restProvider.showToast("OTP has been sent successfully to registered email.","SUCCESS");
      console.log(data);
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
      otp:this.otp
    }

    this.restProvider.verifyOTP(jsonData)
    .then(data => {
      this.isOTP = false;
      this.otp = "";
      loading.dismiss();
      this.navCtrl.push(RegisterPage,{param1 : "hello" , param2 : "world"});
      console.log(data);
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

}
