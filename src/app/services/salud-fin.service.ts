import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from "../config/variables";
import { LogsService } from './logs/logs.service';
import { Saludfin } from '../interfaces/saludfin';
import { Router } from "@angular/router";
import { Route } from '@angular/compiler/src/core';
@Injectable({
  providedIn: 'root'
})
export class SaludfinService {

  api: String = URL;

  constructor(private http: HttpClient, private log: LogsService, private route: Router) {

  }


  saveFinantialHealt(sf: Saludfin) {
    this.log.addLog('salud financiera', 'Guardar respuestas', JSON.stringify(sf));
    return this.http.post(`${this.api}/saludfin/GuardarSaludFinanciera`, sf)
  }

  getFinantialHealt(_id) {
    var id = window.atob(_id);
    this.log.addLog("salud financiera", "Obtener indicadores", id);
    return this.http.get(`${this.api}/saludfin/obtenerIndicadores/${id}`);
  }
}
