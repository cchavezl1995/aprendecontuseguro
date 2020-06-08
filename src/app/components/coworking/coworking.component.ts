import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CoworkingService } from "../../services/coworking.service";
import { Coworking } from "../../interfaces/coworking/coworking";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DiccionarioService } from "../../services/diccionario.service";
import { registerLocaleData } from '@angular/common';
import localeCO from '@angular/common/locales/es-CO';
registerLocaleData(localeCO, 'es-CO');

// Logs
import { LogsService } from "../../services/logs/logs.service";
import { NgSelectConfig } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coworking',
  templateUrl: './coworking.component.html',
  styleUrls: ['./coworking.component.scss']
})
export class CoworkingComponent implements OnInit {

  user;
  count:number = 0;
  formCow: Coworking = {};
  loader: boolean;
  coworkings: Coworking[] = [];

  // Form
  formCoworking: FormGroup;

  constructor(public login: LoginService, public coworking: CoworkingService, public dictionary: DiccionarioService,
    private log: LogsService, private ngSelectConfig: NgSelectConfig, private route: ActivatedRoute, public router: Router) {
    this.ngSelectConfig.notFoundText = 'No se encontro el registro';
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.loader = true;

    // Asignacion de datos al objeto usuairo
    if (this.login.isActive()) {
      this.user = this.login.getDataUser();
      // Create form
      this.formCoworking = new FormGroup({
        // Validators.pattern('[a-zA-Z]')
        dicCiudad: new FormControl('', Validators.compose([Validators.required])),
        fechaAgendamiento: new FormControl('', Validators.compose([Validators.required])),
        horario: new FormControl('', Validators.compose([Validators.required])),
        idUsuario: new FormControl(this.user['idUsuario'], Validators.compose([Validators.required])),
        idAgendaTipo: new FormControl('2036'),
      });
    }


    

    if (this.login.isActive()) {
      this.getCow();
    }

    this.loader = false;
    if (this.login.isActive()) {
      this.log.addLog('coworking', 'ingresó a coworking');
    }

    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )

    if (this.route.snapshot.queryParamMap.get('p') != null) {
      this.router.navigate(['/coworking']);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.login.isActive()) {
      this.log.addLog('coworking', 'salió a coworking');
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.formCoworking.controls; }

  getCow() {
    this.loader = true;
    this.coworking.queryCow(this.user['idUsuario']).subscribe(
      (res: any) => {
        this.coworkings = res;
        // console.log(this.coworkings);     
        this.loader = false;
      }
    )
  }
}
