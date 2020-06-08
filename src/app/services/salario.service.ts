import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../config/variables';
import { Router } from "@angular/router";

import { Area } from './../interfaces/salario';
import { Cargo } from './../interfaces/salario';
import { NivelJerarquico } from './../interfaces/salario';
import { Region } from './../interfaces/salario';
import { TamanoEmpresa } from './../interfaces/salario';

// Logs
import { LogsService } from "./logs/logs.service";

@Injectable({
  providedIn: 'root'
})
export class SalarioService {

  api: String = URL;
  token: String = '';

  constructor(private http: HttpClient, private log: LogsService, private route: Router) { 
    this.token = localStorage.getItem('token')
  }
  
  getArea(): Observable<Area>{
    return this.http.get<Area>(`${this.api}/salarios/area/`);
  }
  getNivelJerarquico(_area: string): Observable<NivelJerarquico>{
    return this.http.get<NivelJerarquico>(`${this.api}/salarios/jerarquico/${_area}`);
  }
  getCargo(_area: string,_nivel: string): Observable<Cargo>{
    return this.http.get<Cargo>(`${this.api}/salarios/cargos?area=${_area}&sector=${_nivel}`);
  }
  getRegion(_area: string,_nivel: string,_cargo:string): Observable<Region>{
    return this.http.get<Region>(`${this.api}/salarios/obtenerRegion?area=${_area}&sector=${_nivel}&cargo=${_cargo}`);
  }
  getTamanoEmpresa(_area: string,_nivel: string,_cargo:string): Observable<TamanoEmpresa>{
    return this.http.get<TamanoEmpresa>(`${this.api}/salarios/obtenerEmpresas?area=${_area}&sector=${_nivel}&cargo=${_cargo}`);
  }

  getGraficoSalario(_area:string, _sector:string, _cargo:string, _region:string, _tamano:string, _salario:string):Observable<any>{
    this.log.addLog('salario','consultar salario',`${_area}-${_sector}-${_cargo}-${_region}-${_tamano}-${_salario}`);
    return this.http.get<TamanoEmpresa>(`${this.api}/salarios/ObtenerGraficos?area=${_area}&sector=${_sector}&cargo=${_cargo}&region=${_region}&tamano=${_tamano}&salario=${_salario}`);
  }

}
