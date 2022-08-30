import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import Swal from "sweetalert2";
import { BooksService } from "src/app/service/books.service";
import { ActivatedRoute } from '@angular/router';
import {  NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-books',
  templateUrl: './update-books.component.html',
  styleUrls: ['./update-books.component.css']
})
export class UpdateBooksComponent implements OnInit {
  booksdataList:any = [];
  deletestatus: any;
  loading: any = false;
  row_id:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor( private activatedRoute: ActivatedRoute, private BooksService: BooksService, public router: Router) { }

  ngOnInit(): void {
    this.row_id  = this.activatedRoute.snapshot.params.id;
    this.row_id = atob(this.row_id);
    this.getdata(this.row_id);
  }

  async getdata(id) {
    this.loading = true;
    await this.BooksService.singleBooks(id).subscribe((data:any) => {
      this.loading = false;
      this.booksdataList = data;
      console.log(data)
      this.dtTrigger.next();
    });
  }

  
  async onSubmit(languagecreateform: NgForm) {

    let detail:any = {};
    detail.Id = this.booksdataList.Id;
    detail.Name = languagecreateform.value.name;
    detail.Type = languagecreateform.value.type;
    detail.Author = languagecreateform.value.author;
    detail.Description = languagecreateform.value.description;
    detail.Price = languagecreateform.value.price;


  await this.BooksService.updateBooks(detail,this.row_id).subscribe(data => {

    if(data)
    {         
      Swal.fire({
        position: 'top-end',
        title: 'info <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17a2b8"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">  <circle cx="12" cy="12" r="10"></circle>  <line x1="12" y1="8" x2="12" y2="12"></line>   <line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
        text: 'Books Updated Successfully',
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
