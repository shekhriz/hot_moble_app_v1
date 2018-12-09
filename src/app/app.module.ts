import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { RateSkillsPage } from '../pages/rate-skills/rate-skills';
import { QuestionPage } from '../pages/question/question';
import { SelectRequirementPage } from '../pages/select-requirement/select-requirement';
import { ShowStatusPage } from '../pages/show-status/show-status'
import { GeneralQuestionPage } from '../pages/general-question/general-question';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { CommonHeaderComponent } from '../components/common-header/common-header';
import { NumberToTextPipe } from '../pipes/number-to-text/number-to-text';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    RateSkillsPage,
    GeneralQuestionPage,
    SelectRequirementPage,
    ShowStatusPage,
    QuestionPage,
    CommonHeaderComponent,
    NumberToTextPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    RateSkillsPage,
    GeneralQuestionPage,
    SelectRequirementPage, 
    ShowStatusPage,
    QuestionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Camera,
    MediaCapture,
    File,
    FileTransfer
  ]
})
export class AppModule {}
