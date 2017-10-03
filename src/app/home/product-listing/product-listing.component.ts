import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../Service/api.service';
import {Product} from '../../Model/Product';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
results;
categories;
CategoryId=999;
  constructor( private apiService:ApiService, private router:Router) { }

  ngOnInit() {
    this.getCategories();
    this.getAllProducts();
  }

   getAllProducts() {
    this.apiService.getAllProducts().subscribe(data => {
      this.results='';
      this.results = data;
   });
  }

 onEdit(ProductId) {
     this.router.navigate(['/home/editProduct',ProductId]);
  }

  onDelete(ProductId:number) {
    this.apiService.deleteProduct(ProductId).subscribe(data => {
      this.getAllProducts();
   });

}

   
   getCategories() {
    this.apiService.getAllCategories().subscribe(data => {
      this.categories = data;
   });
   }
}
