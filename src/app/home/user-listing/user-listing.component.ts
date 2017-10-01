import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../Service/api.service';
import {User} from '../../Model/User';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {
    results;
  constructor( private apiService:ApiService, private router:Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.apiService.getAllUsers().subscribe(data => {
      this.results='';
      this.results = data;
   });
  }
  
  onEdit(UserId) {
     this.router.navigate(['/home/editUser',UserId])
  }

  onDelete(UserId:number) {
    this.apiService.deleteUser(UserId).subscribe(data => {
      this.getAllUsers();
   });
  }

}
