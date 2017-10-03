import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../Service/api.service';
import {Category} from '../../Model/Category';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {
  results;
  constructor( private apiService:ApiService, private router:Router) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.apiService.getAllCategories().subscribe(data => {
      this.results='';
      this.results = data;
   });
  }

 onEdit(CategotyId) {
     this.router.navigate(['/home/editCategory',CategotyId]);
  }
}
