import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from "../config/variables";
import { LogsService } from './logs/logs.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  api: string = URL;
  token: String = '';

  constructor(private http: HttpClient, private log: LogsService, private route: Router) {
    this.token = localStorage.getItem('token')
  }

  createContact(form) {
    this.log.addLog('coworking', 'agregar contact', JSON.stringify(form));
    return this.http.post(`${this.api}/agendamientos/contacto`, form)
  }

  deleteContact(id) {
    this.log.addLog('contact', 'eliminar contact', id);
    return this.http.post(`${this.api}/agendamientos/eliminarContacto/${id}`, null)
  }

  getContacts(userId) {
    var id = window.atob(userId);
    this.log.addLog('contact', 'consulta contact', id);
    return this.http.get(`${this.api}/agendamientos/verContactos/${id}`)
  }

  getAll() {
    this.log.addLog('contact', 'consulta contact', '');
    return this.http.get(`${this.api}/agendamientos/contactos`)
  }
}
