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
import { ActivatedRoute, Router } from '@angular/router';
import { number } from '@amcharts/amcharts4/core';


@Component({
  selector: 'app-networking-events',
  templateUrl: './networking-events.component.html',
  styleUrls: ['./networking-events.component.scss']
})
export class NetworkingEventsComponent implements OnInit {

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
  constructor(public login: LoginService, private networkingService: NetworkingService, private diccionarioService: DiccionarioService,
     private ngSelectConfig: NgSelectConfig, private route: ActivatedRoute, private router: Router) {
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
    this.getListEvents();

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
    console.log("aca");
    } else if (this.filterIdCiudad != 0) {
      this.listaEventos = this.listaEventosFull.filter((x) => x.idCiudad == this.filterIdCiudad);
      console.log("acaa");
    } else if (this.filterIdEvento != 0) {
      this.listaEventos = this.listaEventosFull.filter((x) => x.idEvento == this.filterIdEvento);
      console.log("acaaa");
    } else {
      this.listaEventos = this.listaEventosFull;
      console.log("acaaaaaa");
    }
    console.log("entro!");
    
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

  ///Metodo para pasar a la lista de eventos.
  pasarEvento() {
    this.getListEvents();
    this.evento = {};
    this.pagina = 2;
    window.scroll(0, 0);
  }

  ///Metodo para pasar a la Comunidad.
  pasarComunidad() {
    this.getListEmpresa();
    this.pagina = 5;
    window.scroll(0, 0);
  }


  volverAtras() {
    if (this.pagina == 3) {
      this.pasarEvento();
    } else if (this.pagina == 4) {
      this.pasarEvento();
    } else if (this.pagina == 2 || this.pagina == 5) {
      this.pagina = 0
    }

  }

  ///Metodo para pasar al detalle de eventos.
  detalleEvento(event) {
    // this.evento = this.listaEventos.find(x => x.idEvento == _id);
    // this.pagina = 3;
    window.scroll(0, 0);
    // console.log(event);    
    this.router.navigate(['/networking-detalle-evento', {event: JSON.stringify(event)}]);
  }

  inscribirEvento(_id: number) {
    //Metodo para eliminar la información educativa.
    Swal.fire({
      title: '¿Esta seguro que quiere inscribirse a este Curso?',
      type: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Inscribir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.loader = true;

        let subscribe: any = {
          idEvento: _id,
          IdUsuario: this.user.idUsuario
        }

        this.networkingService.subscribeEvents(subscribe)
          .subscribe(
            (data: any) => {
              this.loader = false;

              this.evento.inscrito = true;

              this.pagina = 4;



            },
            (error: any) => {
              this.loader = false;
              console.log(error);
            }
          );
      }
    });
  }

  onChangeSector(event) {
    this.filtrarEmpresa();
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  moreOrLess(e) {
    //console.log(e);
    this.more = !this.more;
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
