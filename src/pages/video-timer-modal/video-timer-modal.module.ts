import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoTimerModalPage } from './video-timer-modal';

@NgModule({
  declarations: [
    VideoTimerModalPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoTimerModalPage),
  ],
})
export class VideoTimerModalPageModule {}
