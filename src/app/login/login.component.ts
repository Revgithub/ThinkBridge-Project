import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private LoginService:LoginService) { }
  isLoginMode=true;
  showerror=false
  errorMessage;
  ngOnInit(): void {
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
     this.LoginService.login(email, password).subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/Product-list',email]);
      },
      error=>
      {
        console.log(error.error.error.message);
        this.showerror=true;
        if(error.error.error.message =='INVALID_PASSWORD')
        {
          this.errorMessage="Invalid Password";
        }else if(error.error.error.message =='EMAIL_NOT_FOUND'){
          this.errorMessage="EMAIL NOT FOUND";
        }
        else if(error.error.error.message =='INVALID_EMAIL')
        {
          this.errorMessage="Invalid Emial";
        }
        setTimeout(() => {
          this.showerror=false;
        }, 2000);
      });
    } else {
     this.LoginService.signup(email, password).subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/Product-list',email]);
      },
      error=>
      {    this.showerror=true;
        if(error.error.error.message =='INVALID_EMAIL')
        {
          this.errorMessage="Invalid Email";
        }
        setTimeout(() => {
          this.showerror=false;
        }, 2000);
      });
    }
    form.reset();
  }

}
