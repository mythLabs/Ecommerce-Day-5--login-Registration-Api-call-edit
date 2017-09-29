import {CanActivate} from "@angular/router";
import {Router} from "@angular/router";
import {Injectable} from '@angular/core';

@Injectable()
export class guard implements CanActivate {

   constructor(private router:Router ) {

   }

 canActivate() {
    if(this.checkLocalStorage()) {
        return true;
    }else {
        this.router.navigate(['/login']);
    }
    
  }

  checkLocalStorage() {
      if(localStorage.getItem("isLoggedIn")) {
          return true;
      } else{
          return false;
      }
  }
}