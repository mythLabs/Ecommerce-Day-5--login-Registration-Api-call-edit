import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 import {HttpClientModule} from '@angular/common/http';
 import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';

import {guard} from './Guard/app.guard';
import {ApiService} from './Service/api.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './Home/user/user.component';
import { ProductComponent } from './Home/product/product.component';
import { UserListingComponent } from './Home/user-listing/user-listing.component';
import { ProductListingComponent } from './Home/product-listing/product-listing.component';
import { SelfFilterPipe } from './Pipe/self-filter.pipe';
import { CategoryComponent } from './home/category/category.component';
import { CategoryListingComponent } from './home/category-listing/category-listing.component';
import { ProductFilterPipe } from './pipe/product-filter.pipe';

const appRoutes: Routes = [
  { path: '', component: LoginComponent,canActivate: [guard] },
  { path: 'home',component: HomeComponent,canActivate: [guard],
               children:[
                 {path:'',component:UserListingComponent},
                 {path:'userListing',component:UserListingComponent},
                 {path:'addUser',component:UserComponent},
                 {path:'editUser/:id',component:UserComponent},
                 {path:'addCategory',component:CategoryComponent},
                 {path:'categoryListing',component:CategoryListingComponent},
                 {path:'editCategory/:id',component:CategoryComponent},
                 {path:'addProduct',component:ProductComponent},
                 {path:'productListing',component:ProductListingComponent},
                  {path:'editProduct/:id',component:ProductComponent}
               ] },
  { path: 'login', component: LoginComponent }
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    ProductComponent,
    UserListingComponent,
    ProductListingComponent,
    SelfFilterPipe,
    CategoryComponent,
    CategoryListingComponent,
    ProductFilterPipe
  ],
  imports: [
    BrowserModule,
     RouterModule.forRoot(
      appRoutes
    ),
    FormsModule, HttpClientModule,ReactiveFormsModule
  ],
  providers: [ApiService,guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
