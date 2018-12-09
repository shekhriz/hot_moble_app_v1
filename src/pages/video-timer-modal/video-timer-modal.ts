import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the VideoTimerModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({    
  selector: 'page-video-timer-modal',
  templateUrl: 'video-timer-modal.html',
})
export class VideoTimerModalPage {
  quest:string;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public viewCtrl : ViewController) {
    this.quest = this.navParams.get('text');
    this.startTimer();
  }

  ionViewDidLoad() {
  }

  startTimer(){
    var me = this;   
    var timeleft = 10;
    var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById("countdowntimer").textContent = timeleft.toString();
    if(timeleft == 0){
       clearInterval(downloadTimer);
        me.viewCtrl.dismiss('START-RECORDING');
      }
    },1000);
  }
}
