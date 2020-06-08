import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL, user } from "../../config/variables";

// Logs
import { LogsService } from "../logs/logs.service";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  api: string = URL;

  constructor(private http: HttpClient, private log: LogsService) { }

  addSchedule(form) {
    this.log.addLog('agenda', 'agregar agenda', JSON.stringify(form));
    return this.http.post(`${this.api}/agendamientos/AgregarAgenda`, form);
  }

  updateSchedule(form) {
    this.log.addLog('agenda', 'actualizar agenda', JSON.stringify(form));
    return this.http.post(`${this.api}/agendamientos/UpdateAgenda`, form);
  }

  deleteSchedule(scheduleId) {
    this.log.addLog('agenda', 'eliminar agenda', scheduleId);
    return this.http.post(`${this.api}/agendamientos/DeleteAgenda/${scheduleId}`, null);
  }

  getSchedule(scheduleId) {
    var descrip = window.atob(scheduleId);
    this.log.addLog('agenda', 'agregar agenda', descrip);
    return this.http.get(`${this.api}/agendamientos/agenda/${descrip}`);
  }

  getSchedules(UserId) {
    var descrip = window.atob(UserId);
    this.log.addLog('agenda', 'agregar agenda', descrip);
    return this.http.get(`${this.api}/agendamientos/agendas/${descrip}`);
  }

  sendSMSEmail(id, metod) {
    let api = `${this.api}/agendamientos/MensajeAgendar/${id}?metodo=${metod}`;
    // console.log(api);    
    return this.http.get(api);
  }

  getScheduleTypes(type: string) {
    return this.http.get(`${this.api}/agendamientos/agendasModulos/${type}`);
  }
}
