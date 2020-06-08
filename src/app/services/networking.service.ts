import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL } from '../config/variables';
import { Router } from '@angular/router';

import { EventosNetworking } from '../interfaces/eventos-networking';

// Logs
import { LogsService } from "./logs/logs.service";

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {

  api: String = URL;
  token: String = '';
  constructor(private http: HttpClient, private log: LogsService, private route: Router) {
    this.token = localStorage.getItem('token')
  }

  //Metodo que retorna el Curriculum
  getListEvents(_id: number): Observable<EventosNetworking[]> {
    var id = window.atob(_id.toString());
    this.log.addLog('networking', 'obtener networkings', `${id}`);
    return this.http.get<EventosNetworking[]>(`${this.api}/networking/listaEventos/${id}`).pipe(
      map((response: any) => response.data as EventosNetworking[]));
  }
  
  //Metodo para inscribirse a un event.
  subscribeEvents(subscribe: any) {
    this.log.addLog('networking', 'suscribirse a evento', JSON.stringify(subscribe));
    return this.http.post(`${this.api}/networking/AddInscripcion`, subscribe);
  }

  getlistEmpresa() {
    return this.http.get(`${this.api}/itt/listaEmpresas`)
  }

  addEvent(form) {
    return this.http.post(`${this.api}/networking/AddEvento`, form)
  }

  deleteEvent(id) {
    return this.http.post(`${this.api}/networking/desahabilitar/${id}`, null);
  }

  getEvents() {
    return this.http.get(`${this.api}/networking/mant_listaEventos`)
  }

}
