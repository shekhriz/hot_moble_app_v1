import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:string;
  otp:number;
  isOTP:boolean = false;
  constructor(public navCtrl: NavController,public restProvider: RestProvider) {
  }

  genarateOTP(){
    if(this.email == undefined || this.email == ""){
      this.restProvider.showToast("Please enter email address.");
      return;
    }
    if(!this.emailValidate(this.email)){
      this.restProvider.showToast("Email address is not valid.");
      return;
    }

    let jsonData = {
      emailId:this.email
    }
    this.restProvider.getOTP(jsonData)
    .then(data => {
      this.isOTP = true;
      this.email = "";
      console.log(data);
    });
  }

  reGenarateOTP(){
    this.isOTP = false;
    this.email = "";
  }

  login(){
    if(this.otp == undefined || this.otp == ""){
      this.restProvider.showToast("Please enter OTP.");
      return;
    }

    let jsonData = {
      otp:this.otp
    }

    this.restProvider.verifyOTP(jsonData)
    .then(data => {
      this.isOTP = false;
      this.otp = "";
      this.navCtrl.push(RegisterPage,{param1 : "hello" , param2 : "world"});
      console.log(data);
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
