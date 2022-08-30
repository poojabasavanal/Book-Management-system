import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { generalPath, serverUrl, applicationUrl } from 'src/app/constants/generalConstants';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CMS';
  loginCheck:any = 1;
  aUrl = applicationUrl;
  sUrl = serverUrl;
  gPath = generalPath;
  loading = false;


  constructor(private formBuilder: FormBuilder, private activeroute: ActivatedRoute, private router: Router, private cookies: CookieService) { }

  ngOnInit() {
    this.isLogin();
  }

  public loadExternalScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);

  }

  loadscript() {
    this.loadExternalScript(this.aUrl + this.gPath + "assets/assets/js/initailize.js");
  }


  async login(loginForm: NgForm) 
  {
    let username =  loginForm.value.username;
    let password =  loginForm.value.password;

    
        if(username == "admin" && password == "admin")
        {
          this.cookies.set("token","success");
          this.cookies.set("userId", "1");
          this.isLogin();
          
        }
        else
        {
          let errorMessage = "Invalid Credentials..!";
          alert(errorMessage);
          location.reload();
          this.loginCheck = 0;
        }
  }

  isLogin(){

    if(this.cookies.get("token") && this.cookies.get("userId")) 
    {
    
      this.loginCheck = 1;
      this.loadscript();
    }
    else
    {
      this.loginCheck = 0;
    }
  }

 

}
