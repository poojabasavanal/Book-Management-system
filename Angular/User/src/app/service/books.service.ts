import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonService } from './common.service';
import { WEBAPPLOGIN } from '../constants/constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl:string;
  constructor(private http: HttpClient,private CommonService: CommonService) { 
    this.baseUrl = CommonService.BASE_URL;
  }

  /*Books */

  getBooksData()
  {
    var url: any;
    url = this.baseUrl + "api/Books";
    console.log(url)
    return this.http.get<any>(url).pipe(
    map(data => {
        return data;
    }
      , error => console.log("Error: ", error)));   
  }

  createBooks(values)
  {
    let url:any;
    url =this.baseUrl+"api/Books";
    return this.http.post<any>(url,values).pipe(
      map(data=>{
       return "success";
      }, error => console.log("Error: ", error))
    );
  }

  updateBooks(values,id)
  {
    let url:any;
    url =this.baseUrl+"api/Books/"+ id;
    return this.http.put<any>(url,values).pipe(
      map(data=>{
       return "success";
      }, error => console.log("Error: ", error))
    );
  }

  singleBooks(id)
  {
    let url:any;
    url =this.baseUrl+"api/Books/"+ id;
    return this.http.get<any>(url).pipe(
      map(data=>{
       return data;
      }, error => console.log("Error: ", error))
    );
  }  

  deleteBooks(id)
  {
    let url:any;
    url =this.baseUrl+"api/Books/"+ id;
    return this.http.delete<any>(url).pipe(
      map(data=>{
       return "success";
      }, error => console.log("Error: ", error))
    );
  }

  /*Books */

  /*Bookings */

  getBookingsData()
  {
    var url: any;
    url = this.baseUrl + "api/BookingDetails";
    console.log(url)
    return this.http.get<any>(url).pipe(
    map(data => {
        return data;
    }
      , error => console.log("Error: ", error)));   
  }

  /*Bookings */

  getBookingPerUsersData(id)
  {
    var url: any;
    url = this.baseUrl + "api/BookingDetails?RegistrationId="+id;
    console.log(url)
    return this.http.get<any>(url).pipe(
    map(data => {
        return data;
    }
      , error => console.log("Error: ", error)));   
  }

  /*Bookings */

    /*Users */

    getUsersData()
    {
      var url: any;
      url = this.baseUrl + "api/UserLogin";
      return this.http.get<any>(url).pipe(
      map(data => {
          return data;
      }
        , error => console.log("Error: ", error)));   
    }
  
    /*Users */

    /*Feedback */

        getFeedbacksData()
        {
          var url: any;
          url = this.baseUrl + "api/Feedbacks";
          return this.http.get<any>(url).pipe(
          map(data => {
              return data;
          }
            , error => console.log("Error: ", error)));   
        }

        createFeedback(values)
        {
          let url:any;
          url =this.baseUrl+"api/Feedbacks";
          return this.http.post<any>(url,values).pipe(
            map(data=>{
             return "success";
            }, error => console.log("Error: ", error))
          );
        }
      
    /*FeedbackLogin */

        /*Login */

        login(Email,Password)
        {
          var url: any;
          url = this.baseUrl + "api/UserLogin?Email="+Email+"&Password="+Password;
          return this.http.get<any>(url).pipe(
          map(data => {
              return data;
              
          }
            , error => console.log("Error: ", error)));   
        }
      
    /*login */

        /*Login */

            signup(values)
            {
              let url:any;
              url =this.baseUrl+"api/UserLogin";
              return this.http.post<any>(url,values).pipe(
                map(data=>{
                 return "success";
                }, error => console.log("Error: ", error))
              );
            }
          
        /*login */

        
        buy(values)
        {
          let url:any;
          url =this.baseUrl+"api/BookingDetails";
          return this.http.post<any>(url,values).pipe(
            map(data=>{
             return "success";
            }, error => console.log("Error: ", error))
          );
        }
}
