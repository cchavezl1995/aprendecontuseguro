import { Component, OnInit } from '@angular/core';
import { EventosNetworking } from 'src/app/interfaces/eventos-networking';
import { NetworkingService } from 'src/app/services/networking.service';
import { DiccionarioService } from 'src/app/services/diccionario.service';

import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { Diccionario } from 'src/app/interfaces/diccionario';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Empresa } from 'src/app/interfaces/empresa';
import { NgSelectConfig } from '@ng-select/ng-select';
import { FilterArrayByExistsPipe } from 'src/app/pipes/filter-array-by-exists.pipe';
import { ActivatedRoute, Router, Route } from '@angular/router';


@Component({
  selector: 'app-networking',
  templateUrl: './networking.component.html',
  styleUrls: ['./networking.component.scss']
})
export class NetworkingComponent implements OnInit {

  //usuario
  user: any = {};

  ciudades: Diccionario[] = [];
  sectores: Diccionario[] = [];

  filtroCiudades: Diccionario[] = [];
  filtroSectores: Diccionario[] = [];

  listaEventosFull: EventosNetworking[] = [];
  listaEventos: EventosNetworking[] = [];

  listaEmpresaFull: Empresa[] = [];
  listaEmpresa: Empresa[] = [];

  evento: EventosNetworking = {};

  // Loader
  loader: boolean;

  filterIdCiudad: any = '0';
  filterIdEvento: number = 0;
  filterSector: any = '0';

  sect: number[] = []
  config: any;
  ///Constructor
  constructor(public login: LoginService, private networkingService: NetworkingService, private diccionarioService: DiccionarioService, private ngSelectConfig: NgSelectConfig, private route: ActivatedRoute, public router: Router) {
    this.ngSelectConfig.notFoundText = 'No se encontro el registro';
    this.config = {
      id: 'paginarOfertas',
      itemsPerPage: 9,
      currentPage: 1
    }
  }

  ///Metodo de Inicio.
  ngOnInit() {
    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )

    if (this.route.snapshot.queryParamMap.get('p') != null) {
      this.router.navigate(["/networking"]);
    }


    window.scroll(0, 0);
    // Verificacion si existe sesion
    // this.login.verifySesion();

    // Asignacion de datos al objeto usuairo
    if (this.login.isActive()) {
      this.user = this.login.getDataUser();
    }

    var promise = new Promise((resolve, reject) => {
      this.getCiudad();
      this.getSectorList();
      resolve();
    }).then(() => {

    });

  }

  ///Metodo para obtener la lista de eventos.
  getListEvents() {
    this.loader = true;
    this.networkingService.getListEvents(this.user.idUsuario)
      .subscribe(
        (data: any) => {
          this.loader = false;
          this.listaEventosFull = data;
          // this.listaEventosFull = this.listaEventosFull.filter(x => (new Date(x.fechaEvento)>=new Date()));
          this.listaEventos = this.listaEventosFull;

          this.filtroCiudades = new FilterArrayByExistsPipe().transform("idCiudad", this.listaEventosFull, this.ciudades);
        },
        (error: any) => {
          this.loader = false;
          console.log(error)
        }
      );
  }

  getListEmpresa() {
    this.loader = true;
    this.networkingService.getlistEmpresa()
      .subscribe(
        (data: any) => {
          this.loader = false;

          this.listaEmpresaFull = data.data;
          this.listaEmpresa = this.listaEmpresaFull;

          this.sect = Array.from(new Set(this.listaEmpresaFull.map((item: any) => item.idSector)));

          this.filtroSectores = new FilterArrayByExistsPipe().transform("idSector", this.listaEmpresaFull, this.sectores);
        },
        (error: any) => {
          this.loader = false;
          console.log(error)
        }
      );
  }

  //Metodo para filtrar los Eventos.
  filtrarEventos() {
    if (this.filterIdCiudad != 0 && this.filterIdEvento != 0) {
      this.listaEventos = this.listaEventosFull.filter((x) => x.idCiudad == this.filterIdCiudad && x.idEvento == this.filterIdEvento);
    } else if (this.filterIdCiudad != 0) {
      this.listaEventos = this.listaEventosFull.filter((x) => x.idCiudad == this.filterIdCiudad);
    } else if (this.filterIdEvento != 0) {
      this.listaEventos = this.listaEventosFull.filter((x) => x.idEvento == this.filterIdEvento);
    } else {
      this.listaEventos = this.listaEventosFull;
    }
  }

  //Metodo para filtrar la empresa.
  filtrarEmpresa() {

    if (this.filterSector != 0) {
      this.listaEmpresa = this.listaEmpresaFull.filter((x) => x.idSector == this.filterSector);
      this.sect = Array.from(new Set(this.listaEmpresa.map((item: any) => item.idSector)));
    } else {
      this.listaEmpresa = this.listaEmpresaFull;
      this.sect = Array.from(new Set(this.listaEmpresaFull.map((item: any) => item.idSector)));
    }
  }

  //Metodo para obtener las ciudades.
  getCiudad() {
    this.diccionarioService.getDiccionario(7)
      .subscribe(
        (data: any) => {
          this.ciudades = data.data;

          let todos: Diccionario = {
            id: '0',
            text: 'Todos'
          }

          this.ciudades.unshift(todos);
        },
        (error: any) => {
          this.loader = false;
          console.log(error);
        }
      );
  }


  // Metodo para obtener la lista de sectores.
  getSectorList() {
    this.diccionarioService.getDiccionario(3)
      .subscribe(
        (data: any) => { //start of (1)

          this.sectores = data.data;

          let todos: Diccionario = {
            id: '0',
            text: 'Todos'
          }

          this.sectores.unshift(todos);

        }, //end of (1)
        (error: any) => {
          this.loader = false;
          console.log(error);
        }
      );
  }
  getEvento() {
    this.diccionarioService.getDiccionario(1007)
      .subscribe(
        (data: any) => {
          this.evento = data.data;
        },
        (error: any) => console.log(error)
      );
  }
}
