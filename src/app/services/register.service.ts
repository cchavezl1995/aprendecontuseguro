import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL, user, password } from "../config/variables";
import { Router } from "@angular/router";

// Logs
import { LogsService } from "./logs/logs.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  api: string = URL;
  form: any = {};
  token: String = '';

  constructor(private http: HttpClient, private log: LogsService, private route: Router) { 
    this.token = localStorage.getItem('token')
  }

  query(formLogin){
    this.form = {
      "identificacion": formLogin.tipoDocumento,
      "tipoIdentificacion": formLogin.idTipoDocumento
    }
    this.log.addLog('registro','consultar usuario',JSON.stringify(this.form));
    console.log(this.form);
    return this.http.post(`${this.api}/Login/registraruser`, this.form)
  }

  register(formUpdate){
    this.log.addLog('registro','registro usuario',JSON.stringify(this.form));
    return this.http.post(`${this.api}/login/updateuser`, formUpdate)
  }
  changePersonalInfo(formUpdate){
    this.form = formUpdate;
    this.log.addLog('perfil','cambio datos personales',JSON.stringify(this.form));
    return this.http.post(`${this.api}/Profile/ActualizarDatospersonales`, formUpdate)
  }
  changePassword(formUpdate){
    this.form = formUpdate;
    this.log.addLog('perfil','cambio password',JSON.stringify(this.form));
    return this.http.post(`${this.api}/Profile/ActualizarPassword`, formUpdate)
  }
}
