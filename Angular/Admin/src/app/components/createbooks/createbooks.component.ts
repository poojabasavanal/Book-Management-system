import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BooksService } from 'src/app/service/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createbooks',
  templateUrl: './createbooks.component.html',
  styleUrls: ['./createbooks.component.css']
})
export class CreatebooksComponent implements OnInit {
  loading:any = false;

  constructor(private BooksService: BooksService,
    public router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit(languagecreateform: NgForm) {

        let detail:any = {};
        detail.Name = languagecreateform.value.name;
        detail.Type = languagecreateform.value.type;
        detail.Author = languagecreateform.value.author;
        detail.Description = languagecreateform.value.description;
        detail.Price = languagecreateform.value.price;

    
      await this.BooksService.createBooks(detail).subscribe(data => {

        if(data)
        {         
          Swal.fire({
            position: 'top-end',
            title: 'info <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17a2b8"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">  <circle cx="12" cy="12" r="10"></circle>  <line x1="12" y1="8" x2="12" y2="12"></line>   <line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
            text: 'Books Created Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/listBook']);
        }
      
      });
  }

  cancelform()
  {
    this.router.navigate(['language']);
  }

}
