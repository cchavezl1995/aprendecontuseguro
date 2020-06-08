import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { URL } from '../config/variables';
import { Router } from '@angular/router';

import { Area } from './../interfaces/salario'; 
// Logs
import { LogsService } from "./logs/logs.service";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ScorecreditService {
  api: String = URL;
  token: String = '';
  constructor(private http: HttpClient, private log: LogsService, private route : Router,private cookieService:CookieService) { 
    this.token = this.cookieService.get('token');
  }
  
  getScoreCredit(form){  
    this.log.addLog('score credito','consultando',JSON.stringify(form));
    return this.http.post(`${this.api}/alertaFraude/experian`,form);
  }

}
