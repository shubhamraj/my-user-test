import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders } from "@angular/common/http";

// import { User } from './user/user';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user:any;

  constructor(private httpClient: HttpClient ) { }


  //Get User Data From the local server
  getUserData(){

   this.user =  this.httpClient.get('http://localhost:3000/posts');
   return this.user;

  }

  //Add User Data From the local server
  addUserData(data:any){
    
    this.user =  this.httpClient.post('http://localhost:3000/posts', data);
    return this.user;
  
    }


}
