import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/services/oferta.service';
import { Oferta, Sector, Ciudad, Salario } from 'src/app/interfaces/oferta';
import { PaginationInstance } from 'src/app/interfaces/pagination-instance';
import { OfertasPipe } from "../../pipes/ofertas.pipe";
import Swal from 'sweetalert2';
import { WindowScrollController } from '@fullcalendar/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoginService } from "../../services/login.service";

// Logs
import { LogsService } from "../../services/logs/logs.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss']
})
export class JobOffersComponent implements OnInit {
  config: any;
  count: number;
  loader: boolean;
  ofertas: Oferta[];
  proveedor: string;
  sectores: Sector[] = [];
  ciudades: Ciudad[] = [];
  filterSector: string[] = [];
  filterUbicacion: string[] = [];
  filterCargo: string[] = [];
  filterSalario: string[] = [];
  filterSalarioOfertas: string[] = [];
  filterAux: string[] = [];
  txtCargo: string = "";
  txtSector: string = "";
  txtCiudad: string = "";
  cantidadOfertasDesde: number = 1;
  cantidadOfertasHasta: number;
  cantidadOfertas: number;
  existenRegistros: boolean = false;
  collection = { count: this.cantidadOfertas, data: this.ofertas };
  itemsPorPagina: number = 5;
  imgPng: string = "";
  lblUbicacion: string = "";
  lblSector: string = "";
  txtOrden: string = "1";
  mensajeOfertas: string = "Estamos cargando ofertas de tu interés...";
  ubicacion: string = "";
  sector: string = "";
  constructor(private oferta: OfertaService, public login: LoginService, private log: LogsService, private route: ActivatedRoute) {
    this.config = {
      id: 'paginarOfertas',
      itemsPerPage: this.itemsPorPagina,
      currentPage: 1
    }
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.cantidadOfertasDesde = this.itemsPorPagina * (event - 1) + 1;
    this.calculaPaginadoCabecera();
    window.scroll(0, 0);
  }

  calculaPaginadoCabecera() {
    let event: number = this.config.currentPage;
    if (this.itemsPorPagina * (event) > this.cantidadOfertas) {
      this.cantidadOfertasHasta = this.cantidadOfertas;
    } else {
      this.cantidadOfertasHasta = this.itemsPorPagina * event;
    }
  }

  ngOnInit() {
    this.count = 0;
    
    if(this.route.snapshot.queryParamMap.get('p')!=null){
      this.count = 1;
    }
    window.scroll(0, 0);
    if (this.login.isActive()) {
      this.getOfertasProveedor('.', '.', '.', 1000, '.')
      this.log.addLog('ofertas de trabajo', 'ingresó a ofertas laborales');
    }
    
  }
  getSectores() {
    this.oferta.getSectores()
      .subscribe(
        (data: any) => { //start of (1)
          this.sectores = data;
          for (let sec in this.sectores) {
            for (let i in this.sectores[sec].Sector.split(",")) {
              if (this.sectores[sec].Sector.split(",")[i].trim() != '') {
                this.filterSector.push(this.quitarAcentos(this.sectores[sec].Sector.split(",")[i].trim()));
              }
            }
          }
          this.filterSector.sort();
        }, //end of (1)
        (error: any) => console.log(error)
      );
  }
  getCiudades() {
    this.oferta.getCiudades()
      .subscribe(
        (data: any) => { //start of (1)
          this.ciudades = data;
          var cdds = "";
          for (let ciu in this.ciudades) {
            for (let i in this.ciudades[ciu].Ciudad.split(",")) {
              if (this.ciudades[ciu].Ciudad.split(",")[i].trim() != '') {
                this.filterUbicacion.push(this.quitarAcentos(this.ciudades[ciu].Ciudad.split(",")[i].trim()));
              }
            }
          }
          this.filterUbicacion.sort();
        }, //end of (1)
        (error: any) => console.log(error)
      );
  }
  getSalarios() {
    var s: Salario; 
    this.oferta.getSalarios()
      .subscribe(
        (data: any) => { //start of (1)
          for(let i in data){
            this.filterSalario.push(data[i]["Salario"]);
          }
          if(this.filterSalarioOfertas.indexOf("Menos de $1")>=0){
            this.filterSalario.splice(this.filterSalarioOfertas.indexOf("Menos de $1"),1);
            this.filterSalario.unshift("Menos de $1");
          }
        }, //end of (1)
        (error: any) => console.log(error)
      );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.login.isActive()) {
      this.log.addLog('ofertas de trabajo', 'ingresó a curriculum');
    }
  }

  home() {
    this.count = 0;
  }

  getOfertasProveedor(sector, ciudad, salario, cantidad, busqueda) {
    window.scroll(0,0);
    this.getCiudades();
    this.getSalarios();
    this.getSectores();
    this.lblSector = "Industria";
    this.lblUbicacion = "Ciudad";
    // this.loader = true;
    try {
      if(sector==""){
        sector = ".";
      }
      if(ciudad==""){
        ciudad = ".";
      }
      if(salario==""){
        salario = ".";
      }
      if(busqueda==""){
        busqueda = ".";
      }
      this.oferta.getOfertas(sector, ciudad, salario, cantidad, busqueda)
        .subscribe(
          (data: any) => { //start of (1)
            // console.log(data);
            this.ofertas = data;
            this.ordenarOfertas()
            // this.filtrarOfertas();
            this.calcularCantidadOfertas();
            this.loader = false;
          }, //end of (1)
          (error: any) => console.log(error)
        );
    }
    catch{
      Swal.fire({
        title: 'Ops!',
        text: `Hubo un error al cargar la información, favor intentar más tarde.`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.loader = false;
    }
  }

  confirmarFiltrado(){
    this.loader = true;
    this.getOfertasProveedor(this.txtSector,this.txtCiudad,this.filterSalarioOfertas,2000,this.txtCargo);
  }

  ordenarOfertas() {
    if (this.txtOrden == "1") {
      this.ofertas = this.sort_by_key(this.ofertas, "fechaPublicacionOferta", false);
    } else {
      this.ofertas = this.sort_by_key(this.ofertas, "fechaPublicacionOferta", true);
    }
  }

  setSalario(event, salario: string) {
    // console.log(salario);
    let indice: number = -1;
    for (var i = 0; i < this.filterSalarioOfertas.length; i++) {
      if (this.filterSalarioOfertas[i] == salario.toUpperCase()) {
        indice = i;
      }
    }
    if (indice >= 0) {
      delete this.filterSalarioOfertas[indice];
    }
    else {
      this.filterSalarioOfertas.push(salario.toUpperCase());
    }
    this.filterSalarioOfertas = this.filterSalarioOfertas.filter(function (el) {
      return el != null;
    });
    // console.log(this.filterSalarioOfertas);
  }
  calcularCantidadOfertas() {

    // console.log(this.cantidadOfertas);
    this.cantidadOfertas = this.ofertas.length;
    if (this.cantidadOfertas > 0) {
      this.existenRegistros = true;
    } else {
      this.mensajeOfertas = "No se han encontrado ofertas laborales";
      this.existenRegistros = false;
    }
    // console.log(this.existenRegistros);

  }

  limpiarFiltros() {
    this.txtCargo = "";
    this.txtCiudad = "";
    this.txtSector = "";
    this.ubicacion = "";
    this.sector = "";
    let chks = document.getElementsByClassName("checkSalario");
    for (let i = 0; i < chks.length; i++) {
      chks[i]['checked'] = "";
    }
    this.filterSalarioOfertas = [];
    this.getOfertasProveedor(this.txtSector,this.txtCiudad,JSON.stringify(this.filterSalarioOfertas),2000,this.txtCargo);
    // document.getElementById("areas").select = "0";
    // window.scroll(0,0);
  }

  sort_by_key(array, key, ascendente: boolean) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      if (ascendente) {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
      else {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }

    });
  }

  increment() {
    this.login.verifySesion();
    this.count++;
  }

  decrement() {
    this.login.verifySesion();
    this.count--;
  }
  formatearFecha(fecha) {
    var f = fecha.substring(0, 11);
    var dia = f.substring(0, 2);
    var mes = f.substring(3, 5)
    var anio = f.substring(6, 11)
    switch (mes) {
      case '01':
        mes = 'Ene';
        break;
      case '02':
        mes = 'Feb';
        break;
      case '03':
        mes = 'Mar';
        break;
      case '04':
        mes = 'abr';
        break;
      case '05':
        mes = 'May';
        break;
      case '06':
        mes = 'Jun';
        break;
      case '07':
        mes = 'Jul';
        break;
      case '08':
        mes = 'Ago';
        break;
      case '09':
        mes = 'Sep';
        break;
      case '10':
        mes = 'Oct';
        break;
      case '11':
        mes = 'Nov';
        break;
      case '12':
        mes = 'Dic';
        break;
    }
    return dia + ' ' + mes + ' ' + anio;
  }
  normalizaComas(texto){
    texto = texto.replace(/,/g,", ")
    return texto
  }
  primeraLetraMayuscula(texto){
    texto = texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    return texto;
  }
  quitarAcentos(texto){
    return this.primeraLetraMayuscula(texto.toLowerCase().replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u"));
  }
}
