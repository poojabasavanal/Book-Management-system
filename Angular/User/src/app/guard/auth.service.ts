import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookies:CookieService) { }

  IsloggenIn()
  {
    return !!this.cookies.get('token');
  }
}
