import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { URL } from '../../config/variables';

// Logs
import { LogsService } from "../logs/logs.service";

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PsicoService {
  api: String = URL;

  constructor(private http: HttpClient,private log: LogsService) { }

  getTypePsico(){
    return this.http.get(`${this.api}/PruebasSicotecnicas/Tipos`);
  }

  getQuestionsComplete(id){
    this.log.addLog('psico','agregar psico','Consulta para realizar prueba completa');
    return this.http.get(`${this.api}/PruebasSicotecnicas/Preguntas/prueba/${id}`);
  }

  getQuestionsSimulation(id){
    this.log.addLog('psico','agregar psico','Consulta para realizar simulación');
    return this.http.get(`${this.api}/PruebasSicotecnicas/Preguntas/simulacion/${id}`);
  }

  addTest(form){
    this.log.addLog('psico','registro psico prueba',JSON.stringify(form));
    return this.http.post(`${this.api}/PruebasSicotecnicas/RegistraPrueba`,form);
  }

  addAnswerTets(form){
    this.log.addLog('psico','agregar psico pregunta',JSON.stringify(form));
    return this.http.post(`${this.api}/PruebasSicotecnicas/RegistraPregunta`,form).pipe(
      map((response) => {
        return response
      })
    )
  }

  getPsicoReports(id){
    return this.http.get(`${this.api}/PruebasSicotecnicas/resolucion/${id}`);
  }

  finishTest(id){
    this.http.get(`${this.api}/PruebasSicotecnicas/finalizarPrueba/${id}`).subscribe(
      res => {
        // console.log(res);  
      }
    )
  }

  verifyTest(id, typeTest){
    return this.http.get(`${this.api}/PruebasSicotecnicas/verificaCompleta/${id}?tipo=${typeTest}`).pipe(
      map((response) => {
        return response
      })
    )
  }

}
