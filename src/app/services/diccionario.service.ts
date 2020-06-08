import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../config/variables';

import { Diccionario } from './../interfaces/diccionario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DiccionarioService {
 
  api: String = URL;
  token: String = '';

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
  }

  //method to get one todo. returning an observable too
  getDiccionario(_id: number): Observable<Diccionario>{
    return this.http.get<Diccionario>(`${this.api}/Login/tipos/${_id}`);
  }


  // Obtener las ciudades por el id del departamento.
  getCities(_id: number): Observable<Diccionario>{
    return this.http.get<Diccionario>(`${this.api}/Login/CiudadesDepartamento/${_id}`);
  }
}
