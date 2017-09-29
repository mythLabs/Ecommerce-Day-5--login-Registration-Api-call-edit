import {Injectable} from '@angular/core';
import {User} from '../Model/User';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(private _httpClient:HttpClient) {
  }

  saveUser(user:User) {
    //     let headers = new HttpHeaders();
    //  headers.set('Content-Type', 'application/json'); 
    console.log(user);
      return this._httpClient.post("http://localhost:62981/api/User",user).subscribe(data => {
      console.log("done");
    });

  }

  onLogin(user:User) {
    //     let headers = new HttpHeaders();
    //  headers.set('Content-Type', 'application/json'); 
    console.log(user);
      return this._httpClient.get("http://localhost:62981/api/User",{params: new HttpParams().set('username', user.Username).set('password',user.Password)});

  }

  getAllUsers() {
       return this._httpClient.get("http://localhost:62981/api/User");
  }

  getUserById(userId:number) {
     return this._httpClient.get("http://localhost:62981/api/User",{params: new HttpParams().set('userId', userId.toString())});
  }
}