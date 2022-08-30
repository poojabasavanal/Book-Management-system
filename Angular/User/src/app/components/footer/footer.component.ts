import { Component, OnInit } from '@angular/core';
import { generalPath, serverUrl, applicationUrl } from 'src/app/constants/generalConstants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  aUrl = applicationUrl;
  sUrl = serverUrl;
  gPath = generalPath;
  constructor() { }

  ngOnInit(): void {
  }

}
