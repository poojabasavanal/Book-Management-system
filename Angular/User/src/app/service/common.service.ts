import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  BASE_URL: string; 
  DOMAIN_NAME:string;

  constructor(private http:HttpClient) { }

  setServiceUrl(SERVICE_URL: string,HOST_URL:string): any 
  {
      this.BASE_URL = SERVICE_URL;
      this.DOMAIN_NAME = HOST_URL;
  }

}


