import { Component, OnInit } from '@angular/core';
import {ApiService} from '../Service/api.service';
import {User} from '../Model/User';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
Username:string;
  Password:string;
  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit() {
  }

 logIn() {
    let user:User= new User();
    if(this.Username!= "" && this.Username!=null &&this.Username!=undefined) {
      user.Username=this.Username;
      user.Password=this.Password;
      this.apiService.onLogin(user).subscribe(data => {
        debugger;
        if(data!=null) {
                localStorage.setItem("isLoggedIn","1");
          this.router.navigate(['/home']);
        }
       
    });
       
    
  }
  
 }
}
