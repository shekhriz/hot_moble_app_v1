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
import { GeneralQuestionPage } from '../pages/general-question/general-question';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    RateSkillsPage,
    GeneralQuestionPage,
    QuestionPage
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
    QuestionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Camera,
    MediaCapture
  ]
})
export class AppModule {}
