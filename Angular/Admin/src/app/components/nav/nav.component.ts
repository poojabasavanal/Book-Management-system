import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { generalPath, serverUrl, applicationUrl } from 'src/app/constants/generalConstants';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  aUrl = applicationUrl;
  sUrl = serverUrl;
  gPath = generalPath;
  constructor(private cookies: CookieService) { }

  ngOnInit(): void {
  }
  logout()
  {
    this.cookies.deleteAll();
    location.reload();
  }
}
