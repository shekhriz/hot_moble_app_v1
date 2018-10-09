import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {   
  email:"string";
  otp:"number";
  isOTP:false;
  constructor(public navCtrl: NavController) {

  }

  genarateOTP(){
    if(this.email == undefined){
      alert("Please enter valid email");
      return;
    }
    this.isOTP = true;
  }

  login(){
    if(this.otp == undefined){
      alert("Please enter OTP");
      return;
    }
    this.isOTP = false;
    this.navCtrl.push(RegisterPage,{param1 : "hello" , param2 : "world"});
  }

}
