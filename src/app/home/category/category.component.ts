import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Category} from '../../Model/Category'; 
import {ActivatedRoute, Params,Router} from '@angular/router';
import {ApiService} from '../../Service/api.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
 @ViewChild('f') cForm: NgForm;

  editMode = false;
  CategoryId: number;
  currentCategory;
  subscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
               this.CategoryId = params['id'];
               //console.log(this.studentId);
               if(this.CategoryId!= undefined) {
                 this.editMode=true;
                 this.apiService.getCategoryById(this.CategoryId).subscribe(data => {
                      this.currentCategory = data;
                      this.cForm.setValue({
                                 CategoryName: this.currentCategory.CategoryName,
                                CategoryCode: this.currentCategory.CategoryCode,
                                CategoryDescription: this.currentCategory.CategoryDescription
                          });
                    });
                 
               }
               
      }
    );
  }

  onSubmit(form: NgForm) {
   
    let Id =0;
   if(this.editMode) {
     Id=this.currentCategory.CategoryId;
   } 

    const newCategory = new Category(Id,form.value.CategoryName, form.value.CategoryCode,form.value.CategoryDescription);
    if (this.editMode) {
         this.apiService.updateCategory(newCategory).subscribe(data => {
          this.router.navigate(['/home/categoryListing'])
        });
    } else {
      this.apiService.saveCategory(newCategory).subscribe(data => {
            this.router.navigate(['/home/categoryListing']);
    });
    this.editMode = false;
    form.reset();
   }
  }

     ngOnDestroy () {
       try{
        this.subscription.unsubscribe();
       }catch(e) {

       }
       
     }


}
