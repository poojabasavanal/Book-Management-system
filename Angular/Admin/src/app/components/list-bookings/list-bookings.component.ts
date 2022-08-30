import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import Swal from "sweetalert2";
import { BooksService } from "src/app/service/books.service";

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit {
  dataList = [];
  userDataList = [];
  booksDataList = [];
  bookingDetails = [];
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
    await this.BooksService.getBookingsData().subscribe((data) => {
      this.loading = false;
      this.dataList = data;

      this.BooksService.getBooksData().subscribe((data) => {
        this.loading = false;
        data.forEach(element => {
          this.booksDataList[element.Id] = element;
        });

        this.BooksService.getUsersData().subscribe((data) => {
          this.loading = false;
          data.forEach(element => {
            this.userDataList[element.Id] = element;
          });
          this.customData();
        });
      });

      
    });

    


  
   
  }
  /* function to get all language Ends*/
    customData()
    {
      for(let i=0;i<this.dataList.length;i++)
      {
        let det:any = {};
        det.Name = this.userDataList[this.dataList[i].RegistrationId].Name;
        det.Date = this.dataList[i].Date;
        det.Quantity = this.dataList[i].Quantity;
        det.Book = this.booksDataList[this.dataList[i].BookId].Name;
        det.Price = this.dataList[i].Price;
        det.ShippingAddress = this.dataList[i].ShippingAddress;
        this.bookingDetails.push(det);
        
      }
      this.dtTrigger.next();
    }

}
