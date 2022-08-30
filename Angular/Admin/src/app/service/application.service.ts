import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { generalPath, serverUrl, applicationUrl } from 'src/app/constants/generalConstants';
import { SERVICE_NAME} from '../constants/constants'
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {


  constructor(private http: HttpClient, public commonService?: CommonService, private location?: Location) { }

  initializeApp() {
    // var SERVICE_URL  = location.protocol+"//"+location.hostname+SERVICE_NAME;
    // var HOST_URL  = location.protocol+"//"+location.hostname +"/";

    //  var SERVICE_URL  = location.protocol+"//localhost"+SERVICE_NAME;
    //  var HOST_URL = location.protocol+"//localhost/";
    var SERVICE_URL = serverUrl + SERVICE_NAME;
    var HOST_URL = applicationUrl;
    this.commonService.setServiceUrl(SERVICE_URL, HOST_URL);
  }
  
 
}
