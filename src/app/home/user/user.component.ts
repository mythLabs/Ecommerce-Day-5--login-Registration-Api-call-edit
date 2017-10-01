import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import {User} from '../../Model/User';
import {ActivatedRoute, Params,Router} from '@angular/router';
import {ApiService} from '../../Service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  editMode:boolean;
  userId:number;
  userForm: FormGroup;
  currentUser;

  constructor(private activatedRoute: ActivatedRoute, private apiService:ApiService,private fb: FormBuilder,private router:Router) {
    //this.createForm("");
   }

  ngOnInit() {
     this.activatedRoute.params.subscribe(
      (params: Params) => {
               this.userId = params['id'];
               //console.log(this.studentId);
               if(this.userId!= undefined) {
                 this.editMode=true;
                 this.apiService.getUserById(this.userId).subscribe(data => {
                      this.currentUser = data;
                      this.createForm();
                    });
                 
               } else {
                 this.editMode=false;
                 this.createForm();
               }
               
      }
    );
     
      
     
  }

  createForm() {
    let FirstName = '';
    let LastName = '';
    let PhoneNumber = '';
    let City = '';
    let Country = '';
    let Username = '';
    let Password = '';

    if (this.editMode) {
      const user:User = this.currentUser;
       FirstName = !user?FirstName: user.FirstName ;
       LastName = !user?LastName: user.LastName ;
       PhoneNumber = !user?PhoneNumber: user.PhoneNumber ;
       City = !user?City: user.City ;
       Country = !user?Country: user.Country ;
       Username = !user?Username: user.Username ;
       Password= !user?Password: user.Password ;
     }
 
     this.userForm = new FormGroup({
      'FirstName' : new FormControl(FirstName),
      'LastName' : new FormControl(LastName),
      'PhoneNumber' : new FormControl(PhoneNumber),
      'City' : new FormControl(City),
      'Country' : new FormControl(Country),
      'Username' : new FormControl(Username),
      'Password' : new FormControl(Password)
         });

      }
   
   
   onSubmit() {
    this.currentUser = this.prepareDataBeforeSave();
    if(!this.editMode) {
         this.apiService.saveUser(this.currentUser).subscribe(data => {
          this.router.navigate(['userListing'])
        });
     } else {
          this.apiService.updateUser(this.currentUser).subscribe(data => {
            this.router.navigate(['userListing'])
          });;
     }
    
    this.ngOnInit();
  }

   prepareDataBeforeSave(): User {
      const formModel = this.userForm.value;
      let userId:number;
      if(this.editMode==false) {
        userId =0;
      }else {
        userId=this.userId;
      }
    
     console.log(formModel);
     const saveUser:User = {
        UserId:userId,
        FirstName: formModel.FirstName,
        LastName:formModel.LastName,
        PhoneNumber: formModel.PhoneNumber,
        City:formModel.City,
        Country:formModel.Country,
        Username:formModel.Username,
        Password:formModel.Password
      };
     return saveUser;
   }


}
