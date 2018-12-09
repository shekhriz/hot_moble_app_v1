import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { RegisterPage } from '../register/register';
import { ShowStatusPage } from '../show-status/show-status';
/**
 * Generated class for the SelectRequirementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-select-requirement',
  templateUrl: 'select-requirement.html',
})
export class SelectRequirementPage { 
  data:any;
  requirement:string='';
  reqDetailsForApp:Array<Object> = [];
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public restProvider: RestProvider, public navParams: NavParams) {
    this.data = this.restProvider.getRowData();
    this.reqDetailsForApp = this.data.reqDetailsForApp;
  }   

  ionViewDidLoad() {
  }

  submitReq(id){
    let _id = parseInt(id);
    let JsonData = {
      'reqDetailsForApp':this.searchRow(_id,this.data.reqDetailsForApp),
      'candidates':this.data.candidates,
      'positionCandidates':this.searchRow(_id,this.data.positionCandidates),
      'requirementDetailsBean':this.searchRow(_id,this.data.requirementDetailsBean),
    }
    this.getInterviewDetails(JsonData.positionCandidates.candidateLink,JsonData);
  }

  searchRow(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].positionId === nameKey) {
            return myArray[i];
          }
      }
  }


  getInterviewDetails(uniqueId,JsonData){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getInterviewDetails(uniqueId)
    .then((candidateProperty:any) => {
      this.restProvider.getInterviewValidity(uniqueId)
        .then((response:any) => {
          loading.dismiss();
          if(response.candidateEnableDisable=='Enable'){
            if(response.status=='Open'){
                if(candidateProperty.linkValidity=='Active'){
                  this.restProvider.setCandidate(JsonData);
                  this.navCtrl.push(RegisterPage);
                }else if(candidateProperty.linkValidity=='InActive'){
                    if(candidateProperty.linkExpired == "true"){
                        let toast = {
                          reqName: JsonData.reqDetailsForApp.jobTitle,
                          status : 'interviewLinkExpired'
                        }
                        this.navCtrl.push(ShowStatusPage,{msg:toast});
                    }else{
                        let toast = {
                          reqName: JsonData.reqDetailsForApp.jobTitle,
                          status : 'alreadyGivenInterview'
                        }
                        this.navCtrl.push(ShowStatusPage,{msg:toast});
                    }
                }
            }else if(response.status=='Closed'){
                let toast = {
                  reqName: JsonData.reqDetailsForApp.jobTitle,
                  status : 'requirementClosed'
                }
                this.navCtrl.push(ShowStatusPage,{msg:toast});
            }
          }else{
            let toast = {
              reqName: JsonData.reqDetailsForApp.jobTitle,
              status : 'candidateRemoved'
            }
            this.navCtrl.push(ShowStatusPage,{msg:toast});
          }

        },error => {
            console.log(error);
            loading.dismiss();
            this.restProvider.showToast("Something went wrong","ERROR");
        });
    },error => {
        console.log(error);
        loading.dismiss();
        this.restProvider.showToast("Something went wrong","ERROR");
    });
  }

}
