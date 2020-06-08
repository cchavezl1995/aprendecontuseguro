import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpClient,
  HttpErrorResponse,
  HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { LoginService } from "./login.service";
import { password, user as us } from 'src/app/config/variables';
import { UserLogin } from "../interfaces/register/user-login";
import { URL } from "../config/variables";
import * as CryptoJS from 'crypto-js';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class Token implements HttpInterceptor {
  api: string = URL;
  helper = new JwtHelperService();

  constructor( private route: Router, private login:LoginService, public http :HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('/login') || req.url.includes('/Login')
        || req.url.includes('/redirect') || req.url.includes('/diccionario') ) {

        return next.handle(req).pipe(
          map(event => this.extractData(event,1)),
          catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }
    // console.log(this.login.getToken());
    if (this.isTokenExpired()) {
      // console.warn("Token expirado!...");
      this.refreshToken();
    }

    req = req.clone({
      setHeaders: {
          Authorization: `Bearer ${this.login.getToken()}`,
      }
    });

    return next.handle(req).pipe(
        map(event => this.extractData(event,2)),
        //catchError((error: HttpErrorResponse) => this.handleError(error))

          catchError((err: HttpErrorResponse) => {

            if (err.status === 401) {
              this.route.navigateByUrl('/login/1');
            }

            return throwError( err );
          })

    );
  }

  extractData(event: HttpEvent<any>, idAction: number) {
    // console.log(event);

    if (event instanceof HttpResponse) {

        if(event.headers && idAction === 2){
          this.refreshToken();
        }
    }
    return event;
}

handleError(error: HttpErrorResponse) {
    // if (error.error instanceof ErrorEvent) {
    //     console.error('An error occurred:', error.error.message);
    // } else {
    //     console.error('Backend returned code '+error.status+', body was: '+error.error);
    //     if(error.status===401 && error.statusText==='Unauthorized') {
    //         // this.login.logOut();
    //     }
    // }
    // console.error('Something bad happened; please try again later.');
    return throwError(error);
};

refreshToken(){
  let token = JSON.parse(window.atob(CryptoJS.AES.decrypt(localStorage.getItem('token'),"eco_scotia").toString(CryptoJS.enc.Utf8).split('.')[1]))
  let user = JSON.parse(token['Usuario']);
  // console.log("token:"+window.btoa(JSON.parse(token['exp'])));

  ///Pruebas obtener token
  // console.log('ttt: ',CryptoJS.AES.decrypt(localStorage.getItem('token'),"eco_scotia").toString(CryptoJS.enc.Utf8));
  // console.log('get t:',this.login.getToken());
  
  ///


  let form: UserLogin = { "usuario": user['identificacion'], "password": user['clave'], "sitioUsuario": `${us}`, "sitioPassword": `${password}`, "ip":"" }

  console.log(CryptoJS.AES.decrypt(localStorage.getItem('token'),"eco_scotia").toString(CryptoJS.enc.Utf8));
  const exp = this.helper.getTokenExpirationDate(CryptoJS.AES.decrypt(localStorage.getItem('token'),"eco_scotia").toString(CryptoJS.enc.Utf8));
  // console.log('EXP:', exp);
  // const exp = new Date('2019/12/27 16:01');
  // Creamos fecha con un minuto menos para refrescar el token 1 minuto antes de que expire
  let auxExp = new Date(`${exp.getFullYear()}/${(exp.getMonth()+1)<10?'0'+(exp.getMonth()+1):(exp.getMonth()+1)}/${exp.getDate()<10?'0'+exp.getDate():exp.getDate()} ${exp.getHours()}:${(exp.getMinutes()-1)}`);

  let cd = new Date();
  // Creamos fecha actual
  let auxCD = new Date(`${cd.getFullYear()}/${(cd.getMonth()+1)<10?'0'+(cd.getMonth()+1):(cd.getMonth()+1)}/${cd.getDate()<10?'0'+cd.getDate():cd.getDate()} ${cd.getHours()}:${(cd.getMinutes())}`);

  // console.log('e: ',auxExp);
  // console.log('c: ',auxCD);
  // console.log(auxCD.getTime()===auxExp.getTime());

  if (auxCD.getTime()===auxExp.getTime()) {
    // console.log(this.login.getToken());
    // console.log('form: ',form);
    
    
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.login.getToken()
    });
    
    this.http.post(`${this.api}/Login/RefreshToken`,form,{headers: reqHeader}).subscribe(
      res => {
        // console.log("res:"+res['token']);
        localStorage.setItem('token', CryptoJS.AES.encrypt(String(res['token']),"eco_scotia"));
      }
    )
  }else if(auxCD.getTime()>auxExp.getTime()){
    // console.log('Iniciando de nuevo!...');
    
    this.http.post(`${this.api}/Login/IniciarSession`,form).subscribe(
      res => {
        // console.log("res:"+JSON.stringify(res));
        localStorage.setItem('token', CryptoJS.AES.encrypt(String(res['data']['token']),"eco_scotia"));
        window.location.reload();
      }
    )
  }
}

isTokenExpired(){
  return this.helper.isTokenExpired(CryptoJS.AES.decrypt(localStorage.getItem('token'),"eco_scotia").toString(CryptoJS.enc.Utf8));
}

}
