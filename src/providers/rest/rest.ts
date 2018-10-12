import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://qa.hookedontalent.com/';
  constructor(public http: HttpClient,private toastCtrl: ToastController) {
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getOTP(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'otpGeneration', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  verifyOTP(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'otpVerification', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showToast(msg,type) {
      if(type == 'ERROR'){
        let toast = this.toastCtrl.create({
           message: msg,
           duration: 3000,
           position: 'top',
           cssClass: "toastCssError",
          });
      }else if(type == 'SUCCESS'){
        let toast = this.toastCtrl.create({
           message: msg,
           duration: 3000,
           position: 'top',
           cssClass: "toastCssSuccess",
          });
      }
      toast.present();
  }

}
