import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Product} from '../../Model/Product'; 
import {Category} from '../../Model/Category'; 
import {ActivatedRoute, Params,Router} from '@angular/router';
import {ApiService} from '../../Service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('f') pForm: NgForm;
  
  editMode = false;
  productId: number;
  currentProduct;
  categories;
  selectedCategory:number;
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private router:Router) { }

  ngOnInit() {
    this.getCategories();
    this.activatedRoute.params.subscribe(
      (params: Params) => {
               this.productId = params['id'];
               //console.log(this.studentId);
               if(this.productId!= undefined) {
                 this.editMode=true;
                 this.apiService.getProductById(this.productId).subscribe(data => {
                      this.currentProduct = data;
                      this.pForm.setValue({
                                 ProductName: this.currentProduct.ProductName,
                                StockSize: this.currentProduct.StockSize,
                                ProductDescription: this.currentProduct.ProductDescription,
                                SellerName: this.currentProduct.SellerName,
                                CategoryId: this.currentProduct.CategoryId
                          });
                    });
                 
               }
               
      }
    );
  }

  onSubmit(form: NgForm) {
    let Id =0;
   if(this.editMode) {
     Id=this.currentProduct.ProductId;
   } 
 const newProduct = new Product(form.value.ProductName, form.value.StockSize,form.value.ProductDescription,form.value.SellerName,Id,form.value.CategoryId);         
    if (this.editMode) {
    this.apiService.updateProduct(newProduct).subscribe(data => {
           this.router.navigate(['/home/productListing'])
         });
    } else {
       this.apiService.saveProduct(newProduct).subscribe(data => {
             this.router.navigate(['/home/productListing']);
    });
    this.editMode = false;
    form.reset();
   }
  }

  getCategories() {
    this.apiService.getAllCategories().subscribe(data => {
      this.categories = data;
   });
  }
}
