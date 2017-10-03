import {Injectable} from '@angular/core';
import {User} from '../Model/User';
import {Category} from '../Model/Category';
import {Product} from '../Model/Product';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(private _httpClient:HttpClient) {
  }

  //User service
  saveUser(user:User) {
    debugger;
      return this._httpClient.post("http://localhost:52873/api/saveUser",user);

  }

  onLogin(user:User) {
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

  saveImage(formValue) {
    return this._httpClient.post("http://localhost:52873/api/uploadFile",formValue);
  }

  //Category service
  saveCategory(category: Category) {
    debugger;
      return this._httpClient.post("http://localhost:52873/api/saveCategory",category);

  }

   getAllCategories() {
       return this._httpClient.get("http://localhost:52873/api/Category");
  }

  getCategoryById(categoryId:number) {
     return this._httpClient.get("http://localhost:52873/api/Category",{params: new HttpParams().set('id', categoryId.toString())});
  }

  updateCategory(category: Category) {
    return this._httpClient.post("http://localhost:52873/api/updateCategory",category);
  }


  //Product services
  saveProduct(product: Product) {
    debugger;
      return this._httpClient.post("http://localhost:52873/api/saveProduct",product);

  }

   getAllProducts() {
       return this._httpClient.get("http://localhost:52873/api/Product");
  }

  getProductById(productId:number) {
     return this._httpClient.get("http://localhost:52873/api/Product",{params: new HttpParams().set('id', productId.toString())});
  }

  updateProduct(product: Product) {
    return this._httpClient.post("http://localhost:52873/api/updateProduct",product);
  }

  deleteProduct(productId) {
    return this._httpClient.get("http://localhost:52873/api/deleteProduct",{params: new HttpParams().set('id', productId.toString())});
  }
}