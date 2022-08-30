/* Import Module Here Starts */
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
/* Import Module Here Ends */

// import color picker
import { ColorPickerModule } from 'ngx-color-picker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DragulaModule } from 'ng2-dragula';

/* Import Services Here Starts */
import { ApplicationService } from './service/application.service';
import { CommonService } from './service/common.service';

/* Import Services Here Ends */

/* Import Components Here Starts */
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';


// pipe and filter plugin
import { OrderModule } from 'ngx-order-pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './components/books/books.component';
import { CreatebooksComponent } from './components/createbooks/createbooks.component';
import { UpdateBooksComponent } from './components/update-books/update-books.component';
import { ListBookingsComponent } from './components/list-bookings/list-bookings.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListFeedbacksComponent } from './components/list-feedbacks/list-feedbacks.component';
import { BookingsPerUsersComponent } from './components/bookings-per-users/bookings-per-users.component';
import { BuyComponent } from './components/buy/buy.component';
/* Import Components Here Ends */

export function app_Init(appService: ApplicationService) {
  return () => appService.initializeApp();
}
@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    DashboardComponent,
    NavComponent,
    FooterComponent,
    BooksComponent,
    CreatebooksComponent,
    UpdateBooksComponent,
    ListBookingsComponent,
    ListUsersComponent,
    ListFeedbacksComponent,
    BookingsPerUsersComponent,
    BuyComponent
   
  ],
  imports: [
    BrowserModule,DataTablesModule ,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    ColorPickerModule,
    DragulaModule.forRoot(),
    OrderModule,
    NgxLoadingModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: app_Init,
    deps: [ApplicationService],
    multi: true
  }, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
