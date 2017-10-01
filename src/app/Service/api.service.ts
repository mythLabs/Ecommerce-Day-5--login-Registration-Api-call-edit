import {Injectable} from '@angular/core';
import {User} from '../Model/User';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(private _httpClient:HttpClient) {
  }

  saveUser(user:User) {
      return this._httpClient.post("http://localhost:52873/api/saveUser",user);

  }

  onLogin(user:User) {
    //     let headers = new HttpHeaders();
    //  headers.set('Content-Type', 'application/json'); 
    console.log(user);
      return this._httpClient.get("http://localhost:52873/api/Users",{params: new HttpParams().set('username', user.Username).set('password',user.Password)});

  }

  getAllUsers() {
       return this._httpClient.get("http://localhost:52873/api/Users");
  }

  getUserById(userId:number) {
     return this._httpClient.get("http://localhost:52873/api/Users",{params: new HttpParams().set('id', userId.toString())});
  }

  updateUser(user:User) {
    return this._httpClient.post("http://localhost:52873/api/updateUser",user);
  }

  deleteUser(UserId) {
    return this._httpClient.get("http://localhost:52873/api/deleteUser",{params: new HttpParams().set('id', UserId.toString())});
  }
}