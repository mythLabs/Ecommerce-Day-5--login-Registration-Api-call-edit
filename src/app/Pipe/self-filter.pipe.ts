import { User } from './../Model/User';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selfFilter'
})
export class SelfFilterPipe implements PipeTransform {

  transform(value:User[], args?: any): any {
    try {
      const user= value.filter(x=>x.UserId == +localStorage.getItem('isLoggedIn'));
      value.filter(x=>x.UserId != +localStorage.getItem('isLoggedIn'));
      value.unshift(...user);
       console.log(value);
       return value;
    }catch(e) {

    }
    
  }

}
