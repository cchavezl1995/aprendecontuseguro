import { Component, OnInit } from '@angular/core';
import { SalarioService } from 'src/app/services/salario.service';
import { Diccionario } from 'src/app/interfaces/diccionario';

import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { IdentidadDigital } from 'src/app/interfaces/identidad-digital';
import { BrandingDigital } from 'src/app/interfaces/branding-digital';
import { Empresa } from 'src/app/interfaces/empresa';
import { DigitalBrandingService } from 'src/app/services/digital-branding.service';
import { LoginService } from "../../../services/login.service";
import { DiccionarioService } from 'src/app/services/diccionario.service';
import { TouchSequence } from 'selenium-webdriver';

// Logs
import { LogsService } from "../../../services/logs/logs.service";
import { CurriculumService } from 'src/app/services/curriculum.service';
import { Curriculum } from 'src/app/interfaces/curriculum';


@Component({
  selector: 'app-digital-branding-service',
  templateUrl: './digital-branding-service.component.html',
  styleUrls: ['./digital-branding-service.component.scss']
})
export class DigitalBrandingServiceComponent implements OnInit {
  // Usuario
  user: any = {};

  pagina: number = 0;
  loader: boolean = false;

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string;

  formDigitalBranding: FormGroup;
  submitted: boolean = false;

  sectorList: Diccionario[] = [];

  empresa: Empresa = {};
  identidadDigital: IdentidadDigital = {};

  entCurriculum: Curriculum;

  otroSector: boolean = false;



  get f() { return this.formDigitalBranding.controls; }

  ///Constructor de Componente.
  constructor(private route: ActivatedRoute, private diccionarioService: DiccionarioService, private digitalBrandingService: DigitalBrandingService,
    public login: LoginService, private log: LogsService, private curriculumService: CurriculumService, public router: Router ) { }

  ///
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
    if (this.login.isActive()) {
      // Asignacion de datos al objeto usuairo
      this.user = this.login.getDataUser();
    }

    this.getSectorList();

    this.identidadDigital.marcaCheck = false;
    this.identidadDigital.logoCheck = false;
    this.identidadDigital.paginaWebCheck = false;
    this.identidadDigital.portafolioCheck = false;
    this.identidadDigital.redesSocialesCheck = false;

    this.formDigitalBranding = new FormGroup({
      // Validators.pattern('[a-zA-Z]')
      name: new FormControl('', Validators.compose([Validators.required])),
      sector: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+@[^ÑñáéíóúÁÉÍÓÚ]+.[com,org,co,net,es,gov]')] }),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])),
      webPage: new FormControl(''),
      description: new FormControl(''),
      marcaCheck: new FormControl(''),
      logoCheck: new FormControl(''),
      portafolioCheck: new FormControl(''),
      paginaWebCheck: new FormControl(''),
      redesSocialesCheck: new FormControl(''),
      sectorName: new FormControl('')
    });

    this.formDigitalBranding.get('description').setValue('');

    this.formDigitalBranding.get('marcaCheck').setValue(false);
    this.formDigitalBranding.get('logoCheck').setValue(false);
    this.formDigitalBranding.get('paginaWebCheck').setValue(false);
    this.formDigitalBranding.get('portafolioCheck').setValue(false);
    this.formDigitalBranding.get('redesSocialesCheck').setValue(false);

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.login.isActive()) {
      this.log.addLog('Digital branding', 'Salió de digital branding');
    }
  }

  // Metodo para obtener la lista de sectores.
  getSectorList() {
    this.loader = true;
    this.diccionarioService.getDiccionario(3)
      .subscribe(
        (data: any) => { //start of (1)
          this.sectorList = data.data;
          this.loader = false;
        }, //end of (1)
        (error: any) => console.log(error)
      );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formDigitalBranding.invalid) {
      Swal.fire({
        title: 'Ops!',
        text: `Debes diligenciar los campos que son obligatorios.`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.loader = true;

    this.empresa.idUsuario = this.user.idUsuario;
    this.empresa.nombreEmpresa = this.formDigitalBranding.get('name').value;
    this.empresa.idSector = this.formDigitalBranding.get('sector').value;
    this.empresa.mailEmpresarial = this.formDigitalBranding.get('email').value;
    this.empresa.descripcionEmpresa = this.formDigitalBranding.get('description').value;
    this.empresa.paginaWeb = this.formDigitalBranding.get('webPage').value;
    this.empresa.telefonoEmpresarial = this.formDigitalBranding.get('phone').value;

    this.identidadDigital.marcaCheck = this.formDigitalBranding.get('marcaCheck').value;
    this.identidadDigital.logoCheck = this.formDigitalBranding.get('logoCheck').value;
    this.identidadDigital.paginaWebCheck = this.formDigitalBranding.get('paginaWebCheck').value;
    this.identidadDigital.portafolioCheck = this.formDigitalBranding.get('portafolioCheck').value;
    this.identidadDigital.redesSocialesCheck = this.formDigitalBranding.get('redesSocialesCheck').value;

    this.empresa.nombreSector = this.formDigitalBranding.get('sectorName').value;

    this.empresa.identidadDigital = JSON.stringify(this.identidadDigital);

    // console.log(JSON.stringify(this.empresa));

    this.digitalBrandingService.saveEmpresaBranding(this.empresa).subscribe(
      (data: any) => {

        // console.log(data);
        this.loader = false;

        window.scroll(0, 0);

        Swal.fire({
          title: 'Guardado',
          text: 'Se han guardado los datos de la empresa.',
          type: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          this.router.navigate(["/branding-digital-servicio"]);
        });


      },
      (error: any) => {
        this.router.navigate(["/branding-digital-servicio"]);

        this.loader = false;
        console.log(error);
      }
    );
  }
  iniciarBranding() {

    this.loader = true;
    this.curriculumService.getCurriculum(this.user.idUsuario).subscribe(
      (data: any) => { //start of (1)
        this.loader = false;

        this.entCurriculum = data;

        this.pagina++;
        this.formDigitalBranding.get('email').setValue(this.entCurriculum.correoElectronico);
        this.formDigitalBranding.get('phone').setValue(String(this.entCurriculum.telefonoCelular).substring(2, String(this.entCurriculum.telefonoCelular).length));

      }, //end of (1)
      (error: any) => {
        this.loader = false;
        console.log(error);
      }
    );


  }



}
