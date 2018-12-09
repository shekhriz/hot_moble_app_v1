import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,AlertController} from 'ionic-angular';
import { QuestionPage } from '../question/question';
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
  candidate:any;
  reqSkills:Array<Object> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      this.candidate = this.restProvider.getCandidate();
      
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
      // console.log(this.reqSkills);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateSkillsPage');
  }

  
  gotoQuestionPage(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.restProvider.saveSkills(this.candidate.positionCandidates.candidateLink,this.reqSkills)
    .then(data => {
      // SET INTERVIEW STATUS
      let statusData = {
        uniqueId:this.candidate.positionCandidates.candidateLink,
        interviewStatus:"technical"
      }
      this.restProvider.setInterviewStatus(statusData)
      .then(res=>{},error=>{});
      loading.dismiss();
      this.restProvider.showToast("Skills saved successfully.","SUCCESS");
      this.navCtrl.push(QuestionPage);
    },error => {
        loading.dismiss();
        this.restProvider.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

 
}
