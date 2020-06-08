import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-material',
  templateUrl: './video-material.component.html',
  styleUrls: ['./video-material.component.scss']
})
export class VideoMaterialComponent implements OnInit {

  @Input() tipoMateriales?: number;

  constructor() { }
  jsonContenidoFiltrado: any = [];
  jsonContenido: any = [
    {"id":"des_curriculumhome","imagen":"study","titulo":"Video relacionado 1","publicacion":"16","vistas":"24"},
    {"id":"des_curriculumhome","imagen":"entreview","titulo":"Video relacionado 1","publicacion":"2","vistas":"12"},
    {"id":"des_curriculumhome","imagen":"salary","titulo":"Video relacionado 1","publicacion":"5","vistas":"3"},
    
    {"id":"des_study","imagen":"study","titulo":"Video relacionado 1","publicacion":"16","vistas":"24"},
    {"id":"des_study","imagen":"entreview","titulo":"Video relacionado 1","publicacion":"2","vistas":"12"},
    {"id":"des_study","imagen":"salary","titulo":"Video relacionado 1","publicacion":"5","vistas":"3"},
    
    {"id":"des_entreview","imagen":"study","titulo":"Video relacionado 1","publicacion":"16","vistas":"24"},
    {"id":"des_entreview","imagen":"entreview","titulo":"Video relacionado 1","publicacion":"2","vistas":"12"},
    {"id":"des_entreview","imagen":"salary","titulo":"Video relacionado 1","publicacion":"5","vistas":"3"},
    
    {"id":"des_salary","imagen":"study","titulo":"Video relacionado 1","publicacion":"16","vistas":"24"},
    {"id":"des_salary","imagen":"entreview","titulo":"Video relacionado 1","publicacion":"2","vistas":"12"},
    {"id":"des_salary","imagen":"salary","titulo":"Video relacionado 1","publicacion":"5","vistas":"3"},
    
    {"id":"des_joboffers","imagen":"study","titulo":"Video relacionado 1","publicacion":"16","vistas":"24"},
    {"id":"des_joboffers","imagen":"entreview","titulo":"Video relacionado 1","publicacion":"2","vistas":"12"},
    {"id":"des_joboffers","imagen":"salary","titulo":"Video relacionado 1","publicacion":"5","vistas":"3"},
    
    {"id":"des_advisory","imagen":"study","titulo":"Video relacionado 1","publicacion":"16","vistas":"24"},
    {"id":"des_advisory","imagen":"entreview","titulo":"Video relacionado 1","publicacion":"2","vistas":"12"},
    {"id":"des_advisory","imagen":"salary","titulo":"Video relacionado 1","publicacion":"5","vistas":"3"},

  ]

  ngOnInit() {
    this.jsonContenidoFiltrado = this.jsonContenido.filter(X => X["id"]==this.tipoMateriales);
  }

}
