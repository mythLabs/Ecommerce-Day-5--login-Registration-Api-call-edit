import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import {User} from '../../Model/User';
import {ActivatedRoute, Params} from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private apiService:ApiService,private fb: FormBuilder) {
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
                   console.log(data);
                      this.currentUser = data;
                       this.createForm("edit");
                    });
                 
               } else {
                 this.editMode=false;
                   this.createForm("new");
                   //this.setAddresses(this.emptyAddress); 
               }
      }
    );
     
      
     
  }

  createForm(type:string) {
    if(type == "new")
      {
         this.userForm = this.fb.group({
      FirstName:["", Validators.required],
      LastName:["",Validators.required],
      PhoneNumber:["",Validators.required],
      City:["",Validators.required],
      Country:["",Validators.required],
      Username:["",Validators.required],
      Password:["",Validators.required]
    });
      } else if(type == "edit"){
          this.userForm = this.fb.group({
          FirstName:[this.currentUser.FirstName, Validators.required],
      LastName:[this.currentUser.LastName,Validators.required],
      PhoneNumber:[this.currentUser.PhoneNumber,Validators.required],
      City:[this.currentUser.City,Validators.required],
      Country:[this.currentUser.Country,Validators.required],
      Username:[this.currentUser.Username,Validators.required],
      Password:[this.currentUser.Password,Validators.required]
    });
      }
      
    
    
  }
   
   
   onSubmit() {
    this.currentUser = this.prepareDataBeforeSave();
    if(!this.editMode) {
         this.apiService.saveUser(this.currentUser);
     } else {
          //this.apiService.updateStudent(this.currentStudent);
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
