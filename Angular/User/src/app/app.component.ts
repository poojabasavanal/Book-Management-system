import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { generalPath, serverUrl, applicationUrl } from 'src/app/constants/generalConstants';
import { CookieService } from 'ngx-cookie-service';
import { BooksService } from './service/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Book Mart';
  loginCheck:any = 1;
  aUrl = applicationUrl;
  sUrl = serverUrl;
  gPath = generalPath;
  loading = false;


  constructor(private formBuilder: FormBuilder, private activeroute: ActivatedRoute, private router: Router, private cookies: CookieService, private BooksService:BooksService) { }

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

    await this.BooksService.login(username,password).subscribe((data) => {
      this.loading = false;
      if(data != "Not Found")
        {
          this.cookies.set("token","success");
          this.cookies.set("userId", "1");
          localStorage.setItem("userData",JSON.stringify(data))
          this.isLogin();
          
        }
        else
        {
          let errorMessage = "Invalid Credentials..!";
          alert(errorMessage);
          location.reload();
          this.loginCheck = 0;
        }
    });   
        
  }

  async signup(signupForm: NgForm) 
  {
    let detail:any = {};
    detail.Name = signupForm.value.name;
    detail.Email = signupForm.value.email;
    detail.Phone = signupForm.value.phone;
    detail.Password = signupForm.value.password;
    this.loading = true;

    await this.BooksService.signup(detail).subscribe((data) => {
      this.loading = false;
      alert("User Created Successfully")
      location.reload();
    })

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
