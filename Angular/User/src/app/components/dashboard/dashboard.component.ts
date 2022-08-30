import { Component, OnInit } from '@angular/core';
import { serverUrl } from 'src/app/constants/generalConstants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  url = serverUrl;

  constructor() { }
  
  ngOnInit() {

  }

}
