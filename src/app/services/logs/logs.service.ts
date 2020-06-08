import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from "../../config/variables";
import { Router } from '@angular/router';
import { Log, InfoLocation } from "../../interfaces/logs/logs";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  api: string = URL;
  user: any = {};
  log: Log = {};


  constructor(private http: HttpClient, private router: Router) {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('user'),"eco_scotia").toString(CryptoJS.enc.Utf8));
    }else{
      this.user = {}
    }
    if(localStorage.getItem('token')){
      // console.log(localStorage.getItem('token'));
      // console.log(CryptoJS.AES.decrypt(localStorage.getItem('token'),"eco_scotia").toString(CryptoJS.enc.Utf8));
    }

  }

  addLog(pagina: string, control: string, extra?: string){

    // Get parameters
    if(this.user==null){
      this.log.idUsuario = 0;
    }else{
      this.log.idUsuario = this.user['idUsuario'];
    }
    this.log.pagina = pagina;
    this.log.control = control;
    this.log.extra = extra;

    // Get dates
    // console.log('Getting date');
    
    let date = new Date();
    this.log.fechaLocal = `${date.getDate()}/${(date.getMonth()+1)<10?`0${date.getMonth()+1}`:date.getMonth()+1}/${date.getFullYear()}`;
    this.log.horaLocal = `${date.getHours()<10?'0'+date.getHours():date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}`;

    // console.log('making request');
    // Get IP address and City
    this.http.get('https://ipapi.co/json/?key=6f614d73b8bc11a49e7fc2b1b6fba827c48767b8').subscribe(
      res => {
        let info : InfoLocation = res;
        // console.log(res);
        this.log.ciudad_localizacion = info.city
        this.log.direccion_ip = info.ip;

        // console.log(JSON.stringify(this.log));

        // Insert Log
        this.http.post(`${this.api}/logUser/inserta`, this.log).subscribe(
          res => {
            // console.log(res);
            // console.log(`${this.api}/logUser/inserta`);
          }
        )
      }
    )

  }

  getLogs(){
    return this.http.get(`${this.api}/logUser/log`);
  }
}
