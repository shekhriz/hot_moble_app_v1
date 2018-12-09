import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NumberToTextPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'numberToText',
})
export class NumberToTextPipe implements PipeTransform {
  /**
   * Takes a value and convert into score label.
   */
  transform(value: string, ...args) {
    if(parseInt(value) == 0){
      return 'Novice';
    }else if(parseInt(value) == 20){
      return 'Novice';
    }else if(parseInt(value) == 40){
      return 'Average';
    }else if(parseInt(value) == 60){
      return 'Good';
    }else if(parseInt(value) == 80){
      return 'Expert';
    }else if(parseInt(value) == 100){
      return 'Guru';
    }
  }
}
