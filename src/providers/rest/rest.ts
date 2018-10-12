import { HttpClient,HttpHeaders } from '@angular/common/http';
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
  // apiUrl = 'http://localhost:8080/';
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
      this.http.post(this.apiUrl+'otpGeneration', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  verifyOTP(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'otpVerification', JSON.stringify(data),{
        headers: new HttpHeaders().set('Content-Type', 'application/json')
       }).subscribe(res => {
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
          toast.present();
      }else if(type == 'SUCCESS'){
        let toast = this.toastCtrl.create({
           message: msg,
           duration: 3000,
           position: 'top',
           cssClass: "toastCssSuccess",
          });
          toast.present();
      }
  }

  getCandidate(){
    return JSON.parse(window.localStorage.getItem('loginCandidate'));
  }
  setCandidate(candidate){
    window.localStorage.setItem( 'loginCandidate',JSON.stringify(candidate));
  }
  removeCandidate(){
    window.localStorage.setItem( 'loginCandidate',null);
  }

}
