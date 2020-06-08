import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from "../config/variables";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Logs
import { LogsService } from "./logs/logs.service";

@Injectable({
  providedIn: 'root'
})
export class CoworkingService {
  api: string = URL;
  token: String = '';

  constructor(private http: HttpClient, private router: Router, private log: LogsService) {
    this.token = localStorage.getItem('token');
  }

  createCow(form) {
    this.log.addLog('coworking', 'agregar coworking', JSON.stringify(form));
    return this.http.post(`${this.api}/coworking/AgregarCoworking`, form)
  }

  updateCow(form) {
    7
    this.log.addLog('coworking', 'actualizada coworking', JSON.stringify(form));
    return this.http.post(`${this.api}/coworking/UpdateCoworking`, form)
  }

  deleteCow(id) {
    this.log.addLog('coworking', 'agregar coworking', id);
    return this.http.post(`${this.api}/coworking/DeleteCoworking/${id}`, null)
  }

  queryCow(userId) {
    var id = window.atob(userId.toString());
    this.log.addLog('coworking', 'consulta coworking', id);
    return this.http.get(`${this.api}/coworking/ListaCoworking/${id}`)
  }
}
