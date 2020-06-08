import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../config/variables';
import { Oferta, Sector, Ciudad, Salario } from './../interfaces/oferta';
import { Router } from '@angular/router';

// Logs
import { LogsService } from "./logs/logs.service";

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  api: String = URL;
  token: String = '';
  constructor(private http: HttpClient, private log: LogsService, private route: Router) {
    this.token = localStorage.getItem('token')
  }

  
  getOfertasFiltrado(_proveedor: string): Observable<Oferta>{
    this.log.addLog('ofertas laborales','obtener ofertas laborales',JSON.stringify(_proveedor));
    return this.http.get<Oferta>(`${this.api}/ofertas/filtro/${_proveedor}`);
  }
  
  getSectores(): Observable<Sector>{
    return this.http.get<Sector>(`${this.api}/oferta/sectores`);
  }
  
  getCiudades(): Observable<Ciudad>{
    return this.http.get<Ciudad>(`${this.api}/oferta/ciudades`);
  }
  
  getSalarios(): Observable<Salario>{
    return this.http.get<Salario>(`${this.api}/oferta/salarios`);
  }
  getOfertas(sector: string,ciudad: string,salario: string,cantidad: number,busqueda: string): Observable<Oferta>{
    return this.http.get<Oferta>(`${this.api}/oferta/ofertas?sector=`+sector+`&ciudad=`+ciudad+`&salario=`+salario+`&cantidad=`+cantidad+`&busqueda=`+busqueda)
  }
}
