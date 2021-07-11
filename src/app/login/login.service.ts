import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import {  tap } from "rxjs/operators";
import { User } from "./user.model";


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }
  
  @Injectable({ providedIn: 'root' })
  
  export class LoginService implements CanActivate {
loggedIn=false;
currentuser:any
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router) {}
 canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean
 {
   console.log(route);
   console.log(state);
   this.user.subscribe(obj=>
    {console.log(obj);
      this.currentuser=obj
    });
   if(this.currentuser !=null)
   {
    return this.loggedIn=true;
   }
   else
   {
     return this.loggedIn=false;
   }
   
 }
    signup(email: string, password: string) {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDM0sL1286RH5k9OMAylHDGFQI_IAraWtE',
            {
              email: email,
              password: password,
              returnSecureToken: true
            }
          )
          .pipe(
        
            tap(resData => {
             
              this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            })
          );
      }
    
      login(email: string, password: string) {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDM0sL1286RH5k9OMAylHDGFQI_IAraWtE',
            {
              email: email,
              password: password,
              returnSecureToken: true
            }
          )
          .pipe (tap(resData => {
            console.log(resData);
           
              this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            })
          );
      }

   private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    
  } 

  logout(){

    this.user.next(null);
    this.router.navigate(['/login']);
  }
  }