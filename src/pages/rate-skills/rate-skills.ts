import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { GeneralQuestionPage } from '../general-question/general-question';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the RateSkillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rate-skills',
  templateUrl: 'rate-skills.html',
})
export class RateSkillsPage {
  interviewStatus:string;
  candidate:any;
  reqSkills:Array<String> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      this.candidate = this.restProvider.getCandidate();
      this.getInterviewStatus(this.candidate.positionCandidates.candidateLink);
      this.candidate.requirementDetailsBean.primarySkill = "java,php,Anguale Js,Ionic,Laravel";
      this.candidate.requirementDetailsBean.secondarySkill = "My Sql,MongoDb,CouchDB";
      let pSkills = this.candidate.requirementDetailsBean.primarySkill.split(',');
      let sSkills = this.candidate.requirementDetailsBean.secondarySkill.split(',');
      Object.keys(pSkills).forEach(key=> {
        if(pSkills[key] != ""){
          this.reqSkills.push({
            "skills":pSkills[key],
            "score":0
          })
        }
      });
      Object.keys(sSkills).forEach(key=> {
        if(sSkills[key] != ""){
          this.reqSkills.push({
            "skills":sSkills[key],
            "score":0
          })
        }
      });
      console.log(this.reqSkills);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateSkillsPage');
  }

  logout(){
    this.navCtrl.push(HomePage);
    this.restProvider.removeCandidate();
  }

  gotoQuestionPage(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.restProvider.saveSkills(this.candidate.positionCandidates.candidateLink,this.reqSkills)
    .then(data => {
      loading.dismiss();
      this.restProvider.showToast("Skills saved successfully.","SUCCESS");
      console.log(this.interviewStatus);
      if(this.interviewStatus == "technical"){

      }else if(this.interviewStatus == "general"){

      }
      this.navCtrl.push(GeneralQuestionPage);
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  getInterviewStatus(uniqueId){
    this.restProvider.getInterviewStatus(uniqueId)
    .then(data => {
      this.interviewStatus = data;
    },error => {
        console.log(error);
    });
  }

  logoutAlert() {
    let alert = this.alertCtrl.create({
        title: 'Log-Out',
        message: 'Are you sure you want to Log-out ?',
        buttons: [
            {
                text: 'No',
                handler: () => {
                }
            },
            {
                text: 'Yes',
                handler: () => {
                  this.logout();
                }
            }
        ]
    });
    alert.present();
  }

}
