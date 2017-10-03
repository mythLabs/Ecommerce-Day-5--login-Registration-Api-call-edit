import { User } from './../Model/User';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selfFilter'
})
export class SelfFilterPipe implements PipeTransform {

  transform(value:User[], args?: any): any {
    try {
      const user = value.filter(x=>x.UserId == +localStorage.getItem('isLoggedIn'));
     let res= value.filter(x=>x.UserId != +localStorage.getItem('isLoggedIn'));
     res.unshift(...user);
       return value;
    }catch(e) {

    }
    
  }

}
