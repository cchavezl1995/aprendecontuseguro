import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CoworkingService } from "../../../services/coworking.service";
import { Coworking } from "../../../interfaces/coworking/coworking";
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { DiccionarioService } from "../../../services/diccionario.service";
import { Diccionario } from "../../../interfaces/diccionario";

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { registerLocaleData } from '@angular/common';
import localeCO from '@angular/common/locales/es-CO';
registerLocaleData(localeCO, 'es-CO');
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2';
import { element } from 'protractor';

// Logs
import { LogsService } from "../../../services/logs/logs.service";
import { NgSelectConfig } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-coworking-scheduling',
  templateUrl: './coworking-scheduling.component.html',
  styleUrls: ['./coworking-scheduling.component.scss']
})
export class CoworkingSchedulingComponent implements OnInit {

  user;
  //Fechas y Formatos
  datePickerConfig:Partial<BsDatepickerConfig>;
  dateFormat = 'dd-MM-yyyy';
  locale = 'es-CO';
  bsInlineValue = new Date();
  pipe = new DatePipe('es-CO');
  currentDate = new Date();

  count: number;
  formCow: Coworking = {};
  cities: Diccionario[]=[];
  loader: boolean;
  coworkings: Coworking[] = [];

  // Form
  formCoworking: FormGroup;
  submitted: boolean = false;

  constructor(public login: LoginService, public coworking: CoworkingService, public dictionary: DiccionarioService,
    private router: Router, private log: LogsService, private ngSelectConfig: NgSelectConfig, private route: ActivatedRoute ) {

      this.ngSelectConfig.notFoundText = 'No se encontro el registro';

    this.datePickerConfig = Object.assign({}, 
      {
        containerClass: 'theme-default', 
        showWeekNumbers:false,
        dateInputFormat: 'MMMM Do YYYY',
        outsideClick : true, 
        adaptivePosition: true,
        minDate: new Date()
      }
    );

      setInterval(() => {
        this.currentDate = new Date();
        // console.log(this.currentDate);
        
      }, 1);
   }
  
  ngOnInit() {
    window.scroll(0,0);
    this.count = 0;
    this.loader = true;

    // Asignacion de datos al objeto usuairo
    if (this.login.isActive()) {
      this.user = this.login.getDataUser();
      // Create form
      this.formCoworking = new FormGroup({
        // Validators.pattern('[a-zA-Z]')
        dicCiudad: new FormControl('', Validators.compose( [Validators.required])),
        fechaAgendamiento:new FormControl('', Validators.compose( [Validators.required])),
        horario: new FormControl('',  Validators.compose( [Validators.required])),
        idUsuario: new FormControl(this.user['idUsuario'],  Validators.compose( [Validators.required])),
        idAgendaTipo : new FormControl('2036'),
      });
    }


    // Get cities
    this.dictionary.getDiccionario(7).subscribe(
      res => {
        this.cities = res['data'];
        // console.log(this.cities);
        this.loader = false;
      }
    );

    if (this.login.isActive()) {
      this.getCow();
    }

    this.loader = false;
    if (this.login.isActive()) {
      this.log.addLog('coworking','ingresó a coworking');
    }

    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )
    
    this.count = number?number:0;
    if(this.route.snapshot.queryParamMap.get('p')!=null){
      this.count = parseInt(this.route.snapshot.queryParamMap.get('p'));    
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.login.isActive()) {
      this.log.addLog('coworking','salió a coworking');
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.formCoworking.controls; }

  onSubmit(){
    this.submitted = true;
    this.loader = true;
    // console.log('enviando formulario!...');
    if (this.formCoworking.invalid) {
      Swal.fire({
        title: 'Ops!',
        text: `Debes diligenciar los campos que son obligatorios.`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.loader = false;
      return;    
    } else {
      this.formCow.dicCiudad = this.formCoworking.get('dicCiudad').value;
      this.formCow.fechaAgendamiento = this.pipe.transform(this.formCoworking.get('fechaAgendamiento').value, this.dateFormat);
      this.formCow.horario = this.formCoworking.get('horario').value;
      this.formCow.idUsuario = this.formCoworking.get('idUsuario').value;
      this.formCow.idAgendaTipo = this.formCoworking.get('idAgendaTipo').value
      // console.log(this.formCow);
      this.coworking.createCow(this.formCow).subscribe(
        res => {
          // console.log(res);
          if (res['codigo']==0) {
            Swal.fire({
              title: 'Agendado',
              text: 'Agendamiento creado correctamente.',
              type: 'success',
              confirmButtonText: 'Aceptar'
            }).then(result => {
              if (result) {
                this.increment();
              }
            });
          }
          this.getCow();
          this.loader = false;
        }
      )
      this.router.navigate(['/coworking-formulario', {form: JSON.stringify(this.formCow)}]);
    }  
  }

  getCow(){
    this.loader = true;
    this.coworking.queryCow(this.user['idUsuario']).subscribe(
      (res: any) => {
        this.coworkings = res;
        // console.log(this.coworkings);     
        this.loader = false;   
      }
    )
  }

  increment(){
    this.count++;
    // console.log(this.coworkings.length);
    
    if (this.count == 2 && this.coworkings.length > 0) {
      Swal.fire('Requerda que entre cada espacio reservado debe cumplirse al menos 30 días. Puedes seguir disfrutando')
      this.count = 1;
    }
  }

  decrement(){
    this.count--;
  }

  toInt(str){
    return parseInt(str)
  }

  compareDates(date1, date2){    
    return date1 == date2;
  }

}
