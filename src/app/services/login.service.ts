import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from "../config/variables";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

// Logs
import { LogsService } from "./logs/logs.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api: string = URL;
  cobertura: string = 'Desempleo';
  token: String = '';

  constructor(private http: HttpClient, private router: Router, private log: LogsService) {
    this.token = localStorage.getItem('token')
  }

  login(formLogin){
    // console.log(formLogin);
    return this.http.post(`${this.api}/Login/IniciarSession`, formLogin);
  }

  getDataExtra(){
    return this.http.get('https://ipapi.co/json/?key=6f614d73b8bc11a49e7fc2b1b6fba827c48767b8');
  }
  
  getSession(token){
    let reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    // this.log.addLog('login','login usuario',token);
    return this.http.get(`${this.api}/Login/obtenerSession`, {headers: reqHeader})
  }

  recovery(idRecovery){
    this.log.addLog('login','recuperar contraseña usuario',`${idRecovery}`);
    return this.http.post(`${this.api}/Login/RecuperaContrasena/${idRecovery}`,null)
  }

  validateCode(formValidate){
    this.log.addLog('login','validar SMS usuario',JSON.stringify(formValidate));
    return this.http.post(`${this.api}/Login/EnvioCodigo`,formValidate)
  }

  validatePassword(formPassword){
    this.log.addLog('login','validar cambio constraseña usuario',JSON.stringify(formPassword));    
    return this.http.post(`${this.api}/Login/CambiarContrasena`,formPassword)
  }

  // Métodos de interacción con el usuario 

  isActive(){
    return localStorage.getItem('token')&&localStorage.getItem('user')?true:false;
  }

  getDataUser(){
    return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('user'),"eco_scotia").toString(CryptoJS.enc.Utf8));
  }

  getToken(){
    return CryptoJS.AES.decrypt(localStorage.getItem('token'),"eco_scotia").toString(CryptoJS.enc.Utf8);    
  }

  logOut(){
    var _id = this.getDataUser().idUsuario;
    var id = window.atob(_id);   
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['home']);
    this.log.addLog('login','logout usuario','');
    return this.http.post(`${this.api}/Login/Logout/${id}`,null).subscribe(
      res => {
        console.log(res);       
      }
    )
  }

  verifySesion(){
    // Verificacion si existe sesion
    // console.log(this.login.isActive());
    
    // console.log('verificaion ...');
    if (!this.isActive()) {
        this.router.navigateByUrl('/inicia-sesion/1');         
        return;
    }
  }

  goLogin(){
    if (!this.isActive()) {
      window.scroll(0,0);
      this.router.navigateByUrl('/registro/2');
    }else{
      Swal.fire({
        title: '',
        text: `Ya haces parte de www.seguroesparatibdb.com`,
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  getCoberturas(){
    let coberturas = [];
    if (this.isActive()) {
      coberturas = this.getDataUser()['perfiles'];
    }
    else{
      coberturas = ['Desempleo','Itt','Fraude'];
    }

    //coberturas = ['Desempleo','Itt','Fraude'];
    return coberturas;
  }

  getSocios(){
    let socios = [];
    if (this.isActive()) {
      socios = this.getDataUser()['socios'];
    }else{
      socios = ['scotiabank'];
    }
    return socios;
  }

  public saveToken(token) {
    //console.log('Guardar token: ',token);        
    localStorage.setItem('token', token);
  }
}