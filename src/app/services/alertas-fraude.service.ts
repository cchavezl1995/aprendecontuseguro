import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from "../config/variables";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { LogsService } from "./logs/logs.service";

@Injectable({
  providedIn: 'root'
})
export class AlertasFraudeService {
  api: string = URL;
  token: String = '';

  constructor(private http: HttpClient, private router: Router, private log: LogsService) {
    this.token = localStorage.getItem('token')
  }

  configNotifications(alertaNofitifacion) {
    this.log.addLog('Fraude', 'Configurar Alertas', JSON.stringify(alertaNofitifacion));
    return this.http.post(`${this.api}/alertaFraude/Notificaciones`, alertaNofitifacion)
  }

  result(_id) {
    var id = window.atob(_id.toString());
    this.log.addLog('Fraude', 'Configurar Alertas', JSON.stringify(''));
    return this.http.post(`${this.api}/alertaFraude/VerNotificacion?id=${id}`, null)
  }

}
