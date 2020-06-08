import { Component, OnInit } from '@angular/core';
import { EventosNetworking } from 'src/app/interfaces/eventos-networking';
import { NetworkingService } from 'src/app/services/networking.service';
import { DiccionarioService } from 'src/app/services/diccionario.service';

import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { Diccionario } from 'src/app/interfaces/diccionario';
import { Empresa } from 'src/app/interfaces/empresa';
import { NgSelectConfig } from '@ng-select/ng-select';
import { FilterArrayByExistsPipe } from 'src/app/pipes/filter-array-by-exists.pipe';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-networking-service',
  templateUrl: './networking-service.component.html',
  styleUrls: ['./networking-service.component.scss']
})
export class NetworkingServiceComponent implements OnInit {

  more: boolean = true;
  pagina: number = 0;
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
  constructor(public login: LoginService, private networkingService: NetworkingService, private diccionarioService: DiccionarioService, private ngSelectConfig: NgSelectConfig, private route: ActivatedRoute) {
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

    this.pagina = number ? number : 0;
    if (this.route.snapshot.queryParamMap.get('p') != null) {
      this.pagina = parseInt(this.route.snapshot.queryParamMap.get('p'));
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
