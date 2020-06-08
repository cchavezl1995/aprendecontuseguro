import { Component, OnInit } from '@angular/core';
import { SalarioService } from 'src/app/services/salario.service';
import { Diccionario } from 'src/app/interfaces/diccionario';

import { FormGroup, Validators, FormControl} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';

import Swal from 'sweetalert2';
import { IdentidadDigital } from 'src/app/interfaces/identidad-digital';
import { BrandingDigital } from 'src/app/interfaces/branding-digital';
import { Empresa } from 'src/app/interfaces/empresa';
import { DigitalBrandingService } from 'src/app/services/digital-branding.service';
import { LoginService } from "../../services/login.service";
import { DiccionarioService } from 'src/app/services/diccionario.service';
import { TouchSequence } from 'selenium-webdriver';

// Logs
import { LogsService } from "../../services/logs/logs.service";
import { CurriculumService } from 'src/app/services/curriculum.service';
import { Curriculum } from 'src/app/interfaces/curriculum';

@Component({
  selector: 'app-digital-branding',
  templateUrl: './digital-branding.component.html',
  styleUrls: ['./digital-branding.component.scss']
})
export class DigitalBrandingComponent implements OnInit {

  // Usuario
  user: any = {};

  pagina:number = 0;
  loader:boolean = false;

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string;

  formDigitalBranding: FormGroup;
  submitted: boolean = false;

  sectorList:Diccionario[]=[];

  empresa:Empresa = {};
  identidadDigital:IdentidadDigital = {};

  entCurriculum:Curriculum;

  otroSector:boolean=false;



  get f() { return this.formDigitalBranding.controls; }

  ///Constructor de Componente.
  constructor(private route: ActivatedRoute, private diccionarioService:DiccionarioService, private digitalBrandingService:DigitalBrandingService, 
              public login: LoginService, private log: LogsService, private curriculumService:CurriculumService) { }

  ///
  ngOnInit() {
    
    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )
    
    this.pagina = number?number:0;
    if(this.route.snapshot.queryParamMap.get('p')!=null){
      this.pagina = parseInt(this.route.snapshot.queryParamMap.get('p'));    
    }
    window.scroll(0,0);
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
      name: new FormControl('', Validators.compose( [Validators.required])),
      sector:new FormControl('', Validators.compose( [Validators.required])),
      email:new FormControl('', {validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+@[^ÑñáéíóúÁÉÍÓÚ]+.[com,org,co,net,es,gov]')]}),
      phone: new FormControl('', Validators.compose( [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])),
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
      this.log.addLog('Digital branding','Salió de digital branding');
    }
  }

  // Metodo para obtener la lista de sectores.
  getSectorList(){
    this.loader = true;
    this.diccionarioService.getDiccionario(3)
      .subscribe(
        (data: any) =>  { //start of (1)
          this.sectorList = data.data;
          this.loader = false;
        }, //end of (1)
        (error: any)   => console.log(error)
      );
  }

  clearForm(){
    this.formDigitalBranding.get('name').setValue('');
    this.formDigitalBranding.get('sector').setValue('');
    this.formDigitalBranding.get('email').setValue('');
    this.formDigitalBranding.get('phone').setValue('');
    this.formDigitalBranding.get('webPage').setValue('');
    this.formDigitalBranding.get('description').setValue('');
    this.formDigitalBranding.get('marcaCheck').setValue('');
    this.formDigitalBranding.get('logoCheck').setValue('');
    this.formDigitalBranding.get('portafolioCheck').setValue('');
    this.formDigitalBranding.get('paginaWebCheck').setValue('');
    this.formDigitalBranding.get('redesSocialesCheck').setValue('');
    this.formDigitalBranding.get('sectorName').setValue('');
  }



    //Metodo para cargar la foto o logo de la empresa.

    // Test
  //Cargar Archivos
  uploadFile(){
    document.getElementById("inputPhoto").click();
  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

    handleInputChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];      
      var pattern = /image-*/;
      var reader = new FileReader();

      this.empresa.nombreArchivo = file.name;

      if (!file.type.match(pattern)) {
        Swal.fire({
          title: 'Aviso',
          text: 'El formato no es correcto.',
          type: 'warning',
          confirmButtonText: 'Aceptar'
        });
        
        return;
      }     
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  
  _handleReaderLoaded(e) {
      this.loaded = true;
      var reader = e.target;
      this.imageSrc = reader.result;

      this.empresa.logoEmpresa = this.imageSrc.split("base64,")[1];
      this.empresa.idLogo = this.imageSrc.split("base64,")[0] + "base64,";

       if (this.formDigitalBranding.invalid) {
        Swal.fire({
          title: 'Correcto!',
          text: `El logo se ha cargado.`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
  }
    //Fin Metodo para cargar la foto o logo de la empresa.

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
            this.pasarPagina();
          });
    
  
        },
          (error: any) => {
            this.pasarPagina();

            this.loader = false;
            console.log(error);
          }    
        );
    }

    onItemChangeSector(event){
      this.otroSector = this.sectorList.find(x => x.id == this.f.sector.value).habilitarOtro;
    }

  ///Metodo para Pasar de Pagina
  pasarPagina(){
    this.pagina++;
  }

  iniciarBranding(){

    this.loader = true;
    this.curriculumService.getCurriculum(this.user.idUsuario).subscribe(
      (data: any) =>  { //start of (1)
        this.loader = false;
        
        this.entCurriculum = data;

        this.pagina++;
        this.formDigitalBranding.get('email').setValue(this.entCurriculum.correoElectronico);
        this.formDigitalBranding.get('phone').setValue(String(this.entCurriculum.telefonoCelular).substring(2, String(this.entCurriculum.telefonoCelular).length));
        
      }, //end of (1)
      (error: any)   => {
        this.loader = false;
        console.log(error);
      } 
    );


  }

  volverPagina(){
    this.pagina--;
    // console.log(this.pagina);
    
  }

  getMyStyles() {
    let myStyles;

    if (this.imageSrc != null){
        myStyles = {
          'background': 'url(' + this.imageSrc + ') no-repeat' 
        };
    }

    return myStyles;
}  

}
