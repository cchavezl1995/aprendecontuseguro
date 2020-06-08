import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(){

  }

  logout(){

  }

  getJwtToken(){
    return "";
  }

  isTokenExpired(token: any){
    return token;
  }


}
