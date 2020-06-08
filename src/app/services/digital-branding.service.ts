import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL } from '../config/variables';
import { Router } from '@angular/router';

import { Empresa } from '../interfaces/empresa';

// Logs
import { LogsService } from "./logs/logs.service";

@Injectable({
  providedIn: 'root'
})
export class DigitalBrandingService {

  api: String = URL;
  token: String = '';
  
  constructor(private http: HttpClient, private log: LogsService, private route: Router) { 
    this.token = localStorage.getItem('token')
  }

  //Metodo que guarda el curriculum.
  saveEmpresaBranding(empresa: Empresa){
    this.log.addLog('digital branding','guardar digital branding',JSON.stringify(empresa));
    return this.http.post(`${this.api}/itt/RegistrarBranding`, empresa);
  }


  
}
