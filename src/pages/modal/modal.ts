import { Component } from '@angular/core';
import { ViewController,IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
      this.code = this.navParams.get('code');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  savaData(){
    if((this.name == undefined    || this.name == "")    ||
       (this.email == undefined   || this.email == "")   ||
       (this.phone == undefined   || this.phone == "")   ||
       (this.subject == undefined || this.subject == "") ||
       (this.message == undefined || this.message == "")) {
        this.restProvider.showToast("All fields are mandatory.","ERROR");
        return;
    }

    let jsonObj = {
       "reqId":"",
       "candidateId":"",
       "name":"",
       "email":"",
       "phone":"",
       "subject":"",
       "message":"",
    }

    console.log(jsonObj);
    this.viewCtrl.dismiss();
    this.restProvider.showToast("Thanks for contact with us, We will contact you soon.","SUCCESS");
  }

}
