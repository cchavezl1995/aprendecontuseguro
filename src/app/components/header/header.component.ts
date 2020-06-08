import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LogsService } from 'src/app/services/logs/logs.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  desempleo: boolean = false;
  itt: boolean = false;
  fraude: boolean = false;
  servicios: boolean = false;
  coberturas: any[] = [];
  ecosistemas: boolean = false;
  datosSesion: boolean = false;
  datosServices: boolean = false;
  personaMovil: boolean = false;
  opcionesMovil: boolean = false;
  menuEcosistemas: boolean = false;
  muestraMenuPadreEcosistemas: boolean = false;
  mostrarE: boolean = false;
  public innerWidth: any;

  constructor(public login: LoginService, public router: Router, private logs:LogsService) {
    this.coberturas = this.login.getCoberturas();
  }

  AddLog(pagina: string, control: string, extra?: string){
    if(this.login.isActive()){
      this.logs.addLog(pagina,control,extra);
    }
  }
  
  ngOnInit() {
    var count = 0;
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 992) {
      this.opcionesMovil = true;
      this.personaMovil = true;
    }
    this.menuEcosistemas = true;
    this.ecosistemas = true;

    if (this.coberturas.includes("Fraude")) {
      this.login.cobertura = "Fraude";
      this.fraude = true;
      count++;
    }
    if (this.coberturas.includes("Itt")) {
      this.fraude = false;
      this.login.cobertura = "Itt";
      this.itt = true;
      count++;
    }
    if (this.coberturas.includes("Desempleo")) {
      this.fraude = false;
      this.itt = false;
      this.login.cobertura = "Desempleo";
      this.desempleo = true;
      count++;
    }
    if(count==1){
      this.menuEcosistemas = false;
      this.muestraMenuPadreEcosistemas = true;
    }
  }

  exitLogin(){
    if (this.servicios) {
      document.getElementById('ourServices').click();
    }
    if(this.login){
      document.getElementById('datosSesion').click();
      document.getElementById('datosServices').click();
    }
    
  }

  onClickedOutside() {
    if (this.servicios) {
      document.getElementById('ourServices').click();
    }
  }
  onClickedOutsideDatos() {
    if (this.datosSesion) {
      document.getElementById('datosSesion').click();
    }
  }
  onClickedOutsideServices() {
    if (this.datosServices) {
      document.getElementById('datosServices').click();
    }
  }

  setCobertura(cobertura) {
    this.login.cobertura = cobertura;
  }

  datosSesionFun() {
    this.datosSesion = !this.datosSesion;
  }
  datosServicesFun() {
    this.datosServices = !this.datosServices;
  }

  showRegister() {
    console.log('llendo al registro...');

    document.getElementById('register').click();
  }

  showLogin() {
    console.log('llendo al login...');

    document.getElementById('login').click();
  }

  showCollapse() {
    $('#navbarSupportedContent2').attr('class', 'collapse navbar-collapse botonResponsive');
  }

  // showCollapse2() {
  //   $('#navbarSupportedContent').attr('class', 'collapse navbar-collapse botonResponsive');
  // }

  personaMovilFun() {
    this.personaMovil = !this.personaMovil;
  }

  opcionesMovilFun() {
    this.opcionesMovil = !this.opcionesMovil;
  }

  mostrarFun(ecosistema) {
    // console.log(ecosistema);
    document.getElementById('navbarDropdown').click();
    if (ecosistema == 'desempleo') {
      this.desempleo = true;
      this.itt = false;
      this.fraude = false;
    }
    if (ecosistema == 'itt') {
      this.itt = true;
      this.desempleo = false;
      this.fraude = false;
    }
    if (ecosistema == 'fraude') {
      this.fraude = true;
      this.desempleo = false;
      this.itt = false;
    }
  }

  serviciosFun() {
    this.servicios = !this.servicios;
    if (this.servicios) {
      if (this.innerWidth > 992) {
        $('#ourServices').css({
          'border-bottom-style': 'solid', 'border-bottom-color': '#ec1c24', 'margin-top': '7px !important', 'padding': '23px !important 25px !important'
        });
      }
    }
    else {
      $('#ourServices').attr('style', '');
    }
  }

  goHome() {
    this.router.navigateByUrl('/inicio').then(e => {
      window.location.reload();
    });
  }

  mostrarEcosistemas(){
    this.mostrarE = true;
  }
}
