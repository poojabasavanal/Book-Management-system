import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BooksService } from 'src/app/service/books.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  loading:any = false;
  row_id:any;
  detail:any;
  userDetails:any;

  constructor(private BooksService: BooksService,
    public router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.row_id  = this.activatedRoute.snapshot.params.id;
    this.row_id = atob(this.row_id);
    this.BooksService.singleBooks(this.row_id).subscribe(data => {
      this.detail = data;
    })
    this.userDetails = JSON.parse(localStorage.getItem("userData"));
  }

  async onSubmit(languagecreateform: NgForm) {

        let detail:any = {};
        detail.Date = languagecreateform.value.date;
        detail.Quantity = languagecreateform.value.qty;
        detail.ShippingAddress = languagecreateform.value.ShippingAddress;
        let price = this.detail.Price * languagecreateform.value.qty;
        detail.Price = price;
        detail.BookId = this.detail.Id;
        detail.RegistrationId = this.userDetails.Id;
        //console.log(this.userDetails.Id)

        
    
      await this.BooksService.buy(detail).subscribe(data => {

        if(data)
        {         
          Swal.fire({
            position: 'top-end',
            title: 'info <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17a2b8"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">  <circle cx="12" cy="12" r="10"></circle>  <line x1="12" y1="8" x2="12" y2="12"></line>   <line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
            text: 'Ordered Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/listBookings']);
        }
      
      });
  }

  cancelform()
  {
    this.router.navigate(['listBookings']);
  }
}
