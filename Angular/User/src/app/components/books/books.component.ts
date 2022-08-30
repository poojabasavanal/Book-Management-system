import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import Swal from "sweetalert2";
import { BooksService } from "src/app/service/books.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  booksdataList = [];
  deletestatus: any;
  loading: any = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  //tooltips


  //end tooltips
  constructor(
    private BooksService: BooksService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getdata();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  /* function to get all language Starts*/

  async getdata() {
    this.loading = true;
    await this.BooksService.getBooksData().subscribe((data) => {
      this.loading = false;
      this.booksdataList = data;

      this.dtTrigger.next();
    });
  }
  /* function to get all language Ends*/

  async deleteData(id) {
    this.loading = true;
    await this.BooksService.deleteBooks(id).subscribe((data) => {
     location.reload();
    });
  }

  /* function to update language Starts*/
  updateBooks(row_id) {
    row_id = btoa(row_id);
    this.router.navigate(["buy/" + row_id]);
  }
  /* function to update language Ends*/
}
