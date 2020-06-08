import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, from } from 'rxjs';

import { map } from 'rxjs/operators';

import { URL } from '../config/variables';

import { Router } from '@angular/router';



import { Curriculum, plantillaHTML } from './../interfaces/curriculum';

import { CurriculumFile } from './../interfaces/curriculum-file';

import { InfoEducativa } from './../interfaces/info-educativa';



// Logs

import { LogsService } from "./logs/logs.service";

import { color } from 'html2canvas/dist/types/css/types/color';



@Injectable({

  providedIn: 'root'

})

export class CurriculumService {



  api: String = URL;
  token: String = '';



  constructor(private http: HttpClient, private log: LogsService, private route: Router) { 
    this.token = localStorage.getItem('token')
  }



  //Metodo que retorna el Curriculum

  getCurriculum(_id: number): Observable<Curriculum>{
    var id = window.atob(_id.toString());
    this.log.addLog('Hoja de vida','consulta hoja de vida',`${id}`);

    return this.http.get<Curriculum>(`${this.api}/hoja/TraeDatosPersonalesIdUser/${id}`).pipe(

        map((response: any) => response.data as Curriculum));

  }



  //Metodo que guarda el curriculum.

  saveCurriculum(curriculum: Curriculum){

    this.log.addLog('Hoja de vida','guardar hoja de vida',JSON.stringify(curriculum));

    return this.http.post(`${this.api}/hoja/UpdateDatosPersonales`, curriculum);

  }



  ///Metodo que guarda la información principal de estudio.

  saveInfoEducativa(infoEducativa){

    this.log.addLog('Hoja de vida','guardar info educativa',JSON.stringify(infoEducativa));

    return this.http.post(`${this.api}/Hoja/InsertaEstudioPrincipal`, infoEducativa);

  }



  ///Metodo que edita la información principal de estudio.

  editInfoEducativa(infoEducativa){

    this.log.addLog('Hoja de vida','actualizar info educativa',JSON.stringify(infoEducativa));

    return this.http.post(`${this.api}/Hoja/EditarEstudioPrincipal`, infoEducativa);

  }



  ///Metodo que guarda la información Complementaria.

  saveInfoComplementaria(infoComplementaria){

    this.log.addLog('Hoja de vida','guardar info complementaria',JSON.stringify(infoComplementaria));

    return this.http.post(`${this.api}/Hoja/InsertaEstudioComplementario`, infoComplementaria);

  }



  ///Metoodo que edita la información Complementaria.

  editInfoComplementaria(infoComplementaria){

    this.log.addLog('Hoja de vida','actualizar info complementaria',JSON.stringify(infoComplementaria));

    return this.http.post(`${this.api}/Hoja/EditarEstudioComplementario`, infoComplementaria);

  }



  ///Metodo que elimina la información Educativa tanto complementaria como principal.

  deleteInfoEducativa(_id){
    var id = window.atob(_id.toString());
    this.log.addLog('Hoja de vida','guardar info educativa',`${id}`);

    return this.http.post(`${this.api}/Hoja/NoVigenteEstudio/${id}`, null);

  }



  ///Metodo que guarda la información de la experiencia laboral.

  saveInfoLaboral(infoLaboral){

    this.log.addLog('Hoja de vida','guardar info laboral',JSON.stringify(infoLaboral));

    return this.http.post(`${this.api}/Hoja/InsertaExperienciaLaboral`, infoLaboral);

  }



  ///Metodo que edita la información de la experiencia Laboral.

  editInfoLaboral(infoLaboral){

    this.log.addLog('Hoja de vida','actualizar info laboral',JSON.stringify(infoLaboral));

    return this.http.post(`${this.api}/Hoja/EditaExperienciaLaboral`, infoLaboral);

  }

  

  ///Metodo que elimina la información de la experiencia laboral.

  deleteInfoLaboral(_id){
    var id = window.atob(_id.toString());
    this.log.addLog('Hoja de vida','eliminar info laboral',`${id}`);

    return this.http.post(`${this.api}/Hoja/NoVigenteLaboral/${id}`, null);

  }



  ///Metodo que retorna la foto del Curriculum

  getPhotoCurriculum(_id: number): Observable<string>{
    var id = window.atob(_id.toString());
    this.log.addLog('Hoja de vida','Obtener foto hoja de vida',`${id}`);

    return this.http.get<string>(`${this.api}/Hoja/mostrarImagen/${id}`);

  }



  //Metodo que guarda el curriculum.

  savePhotoCurriculum(curriculumFile: CurriculumFile){
    this.log.addLog('Hoja de vida','actualizar foto hoja de vida',`${curriculumFile}`);  
     return this.http.post(`${this.api}/Hoja/subirArchivo`, curriculumFile);

  }



      ///Metodo que retorna la foto del Curriculum

    getPdfCurriculum(_id: number): Observable<string>{
      var id = window.atob(_id.toString());
      this.log.addLog('Hoja de vida','guardar pdf hoja de vida',`${id}`);

      return this.http.get<string>(`${this.api}/Hoja/PdfJson/${id}`);

    }

    //Método que retorna listado de plantillas HTML

    getPdfTemplates(): Observable<plantillaHTML>{

      return this.http.get<plantillaHTML>(`${this.api}/Hoja/plantillas`);

    }

    setPersonalization(_user: number,_color: string, _tipoTexto: string, idPlantillaAplicada: number): Observable<string>{

      return this.http.get<string>(`${this.api}/Hoja/actualizarPlantilla/${idPlantillaAplicada}?user=`+_user+`&tipoTexto=`+_tipoTexto+`&colorHv=`+_color.replace("#",""));

    }

}