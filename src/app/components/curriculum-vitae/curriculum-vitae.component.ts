import { Component } from '@angular/core';
import { Curriculum, plantillaHTML } from '../../interfaces/curriculum';
import { DiccionarioService } from '../../services/diccionario.service';
import { CurriculumService } from '../../services/curriculum.service';
import { Diccionario } from 'src/app/interfaces/diccionario';
import { Social } from "../../interfaces/curriculum/social";
import { CurriculumValidation } from "../../interfaces/curriculum/curriculum-validation";
import { InfoEducativa } from 'src/app/interfaces/info-educativa';
import { ExperienciaLaboral } from 'src/app/interfaces/experiencia-laboral';
import { LoginService } from "../../services/login.service";
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { SwiperComponent, Angular2UsefulSwiperModule } from "angular2-useful-swiper";

import { CurriculumFile } from 'src/app/interfaces/curriculum-file';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

import { registerLocaleData } from '@angular/common';

import localeCO from '@angular/common/locales/es-CO';
registerLocaleData(localeCO, 'es-CO');

import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { DatePipe } from '@angular/common';

defineLocale('es', esLocale);

// Logs
import { LogsService } from "../../services/logs/logs.service";
import { NgSelectConfig } from '@ng-select/ng-select';
import Swiper, { SwiperOptions, PaginationOptions } from 'swiper';
import { iif } from 'rxjs';

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.scss']
})
export class CurriculumVitaeComponent {
  socials = [
    {
      id: 1,
      name: 'Linkedin',
      icon: 'fab fa-linkedin-in mt-2',
      color: '#d8d8d8',
      value: '',
      form: 'linkedin'
    },
    {
      id: 2,
      name: 'Facebook',
      icon: 'fab fa-facebook-f mt-2',
      color: '#1779c7',
      value: '',
      form: 'facebook'
    },
    {
      id: 3,
      name: 'Portafolio o blog',
      icon: 'fas fa-globe mt-2',
      color: '#66d17e',
      value: '',
      form: 'other'
    }

  ];


  firstTime: boolean = false;
  firstTime2: boolean = false;
  //Fechas y Formatos
  datePickerConfig: Partial<BsDatepickerConfig>;
  dateFormat = 'dd-MM-yyyy';
  locale = 'es-CO';

  bsInlineValue = new Date();
  pipe = new DatePipe('es-CO');

  // Declacion para validaciones de formulario
  // Ejemplo
  // myForm: FormGroup;
  formHv: FormGroup;
  submitted: boolean = false;
  formStudy: FormGroup;
  submitted2: boolean = false;

  formComplementary: FormGroup;
  submitted3: boolean = false;

  formLabor: FormGroup;
  submitted4: boolean = false;


  showCurriculum: boolean = false;

  curriculum: Curriculum = {};
  curriculumArchivos: CurriculumFile = {};
  redesSociales: Social;
  infoEducativa: InfoEducativa[] = [];
  infoComplementaria: InfoEducativa[] = [];
  infoLaboral: ExperienciaLaboral[] = [];

  habilidadesTrabajar: number[] = [];
  paisesTrabajar: number[] = [];
  paisTrabajar: number = null;

  idiomasSeleccionado: any[] = [];

  hab: any = null;

  count: number;
  countError: number;
  errorTipo: boolean;
  errorNum: boolean;
  message: string;
  pdf: string;

  ciudades: Diccionario[] = [];
  ciudadesHV: Diccionario[] = [];
  profesiones: Diccionario[] = [];
  areas: Diccionario[] = [];
  aspiracionSalarial: Diccionario[] = [];
  paises: Diccionario[] = [];
  nivelEducativo: Diccionario[] = [];
  tipoEstudio: Diccionario[] = [];
  intensidadHoraria: Diccionario[] = [];
  idiomas: Diccionario[] = [];
  tiposDocumento: Diccionario[];
  aniosExperiencia: Diccionario[] = [];
  habilidades: Diccionario[] = [];
  instituciones: Diccionario[] = [];
  departamentos: Diccionario[] = [];


  modeEducativa: string = 'new';
  modeComplementario: string = 'new';
  modeExperiencia: string = 'new';
  modeIdioma: string = 'new';

  entInfoEducativa: InfoEducativa;
  entInfoComplementaria: InfoEducativa;
  entExperienciaLaboral: ExperienciaLaboral;
  entIdioma: any;

  // Usuario
  user: any = {};

  // Validaciones
  curriculumBool: CurriculumValidation;

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  muestraFormularioEducacion: boolean = false;
  muestraFormularioIdioma: boolean = false;
  muestraFormularioComplementario: boolean = false;
  muestraFormularioExperiencia: boolean = false;

  // Steps del progreso
  step: number = 0;

  // Creacion pdf
  created: boolean = false;
  show: boolean = false;

  // Loader
  loader: boolean;

  // Plantillas
  iPlantilla: number;
  newSwiper: Swiper;
  plantillas: plantillaHTML[];
  idPlantillaAplicada: number;
  stepPlantilla: number = 1;
  colorPlantilla: string = "";
  tipoTextoPlantilla: string = "";

  //JSON de cada configuración de plantilla.
  jsonColores: any = [
    { "idColor": 1, "nombreColor": "Negro", "colorHex": "#7b8189", "colorBBDD": "#7b8189" },
    { "idColor": 2, "nombreColor": "Azul", "colorHex": "#0c79bc", "colorBBDD": "#0c79bc" },
    { "idColor": 3, "nombreColor": "Verde", "colorHex": "#017c73", "colorBBDD": "#017c73" },
    { "idColor": 4, "nombreColor": "Morado", "colorHex": "#412c9b", "colorBBDD": "#412c9b" },
    { "idColor": 5, "nombreColor": "Naranja", "colorHex": "#ee7200", "colorBBDD": "#ee7200" }
  ]
  jsonTextoTipos: any = [
    { "idTipoTexto": 1, "nombreTipoTexto": "Helvetica", "tipoTextoStyle": "Helvetica" },
    { "idTipoTexto": 2, "nombreTipoTexto": "Calibri", "tipoTextoStyle": "Calibri" },
    { "idTipoTexto": 3, "nombreTipoTexto": "Georgia", "tipoTextoStyle": "Georgia" },
    { "idTipoTexto": 4, "nombreTipoTexto": "Verdana", "tipoTextoStyle": "Verdana" },
    { "idTipoTexto": 5, "nombreTipoTexto": "Tahoma", "tipoTextoStyle": "Tahoma" }
  ]

  constructor(private diccionarioService: DiccionarioService,
    private curriculumService: CurriculumService,
    private localeService: BsLocaleService,
    public login: LoginService,
    private log: LogsService,
    private ngSelectConfig: NgSelectConfig) {

    this.ngSelectConfig.notFoundText = 'No se encontro el registro';

    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-red',
        showWeekNumbers: false,
        dateInputFormat: 'DD-MM-YYYY',
        minDate: new Date(1900, 0, 1),
        maxDate: new Date(2050, 0, 1)
      });

    // Ejemplo validacion de formulario AngularForms
    // this.myForm = this.fb.group({
    //   company: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10)]],
    // });
    this.formHv = new FormGroup({
      // Validators.pattern('[a-zA-Z]')
      names: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]{1,30}')])),
      paternalLastName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]{1,30}')])),
      maternalLastName: new FormControl(''),
      documentType: new FormControl(''),
      document: new FormControl(''),
      email: new FormControl('', { validators: [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]+.*@[^ÑñáéíóúÁÉÍÓÚ]+.[com,org,co,net,es]')] }),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}')])),
      birthDate: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', Validators.compose([Validators.required])),
      residenceCity: new FormControl('', Validators.compose([Validators.required])),
      departamento: new FormControl('', Validators.compose([Validators.required])),
      residenceAddress: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100)])),
      ocupation: new FormControl('', Validators.compose([Validators.required])),
      expirience: new FormControl('', Validators.compose([Validators.required])),
      salary: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl(''),
      countries: new FormControl([], Validators.compose([])),
      area: new FormControl('', Validators.compose([Validators.required])),
      facebook: new FormControl(''),
      linkedin: new FormControl(''),
      other: new FormControl(''),
      canTrip: new FormControl(''),
      canChange: new FormControl(''),
      descripcion: new FormControl('',Validators.compose([])),
    });

    this.formStudy = new FormGroup({
      dicAreaEstudio: new FormControl('', Validators.compose([Validators.required])),
      dicCiudadEstudio: new FormControl('', Validators.compose([Validators.required])),
      institucionEducativa: new FormControl('', Validators.compose([Validators.required])),
      dicNivelEducativo: new FormControl('', Validators.compose([Validators.required])),
      tituloObtenido: new FormControl('', Validators.compose([Validators.required])),
      estadoEstudio: new FormControl('', Validators.compose([Validators.required])),
      fechaInicio: new FormControl('', Validators.compose([Validators.required])),
      fechaFin: new FormControl(''),
      estudioExtranjero: new FormControl(''),
      descripcionEducacion: new FormControl('')
    });

    this.formComplementary = new FormGroup({
      dicAreaEstudio: new FormControl('', Validators.compose([Validators.required])),
      dicCiudadEstudio: new FormControl('', Validators.compose([Validators.required])),
      institucionEducativa: new FormControl('', Validators.compose([Validators.required])),
      tituloObtenido: new FormControl('', Validators.compose([Validators.required])),
      estadoEstudio: new FormControl('', Validators.compose([Validators.required])),
      fechaInicio: new FormControl('', Validators.compose([Validators.required])),
      fechaFin: new FormControl(''),
      dicIntensidadEstudio: new FormControl('', Validators.compose([Validators.required])),
      otroEstudio: new FormControl(''),
      dicTipoEstudio: new FormControl('', Validators.compose([Validators.required])),
      estudioExtranjero: new FormControl(''),
      descripcionEducacion: new FormControl('')
    });

    this.formLabor = new FormGroup({
      empresa: new FormControl('', Validators.compose([Validators.required])),
      cargo: new FormControl('', Validators.compose([Validators.required])),
      funcioneslogros: new FormControl('', Validators.compose([Validators.required])),
      fechaIngreso: new FormControl('', Validators.compose([Validators.required])),
      fechaSalida: new FormControl(''),
      currentJob: new FormControl(false, Validators.compose([Validators.required])),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formHv.controls; }
  get fs() { return this.formStudy.controls; }
  get fc() { return this.formComplementary.controls; }
  get fl() { return this.formLabor.controls; }

  // Metodo para enviar el formulario
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formHv.invalid) {
      Swal.fire({
        title: 'Ops!',
        text: `Debes diligenciar los campos que son obligatorios.`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.loader = true;

    this.curriculum.nombres = this.formHv.get('names').value;
    this.curriculum.apellidoPaterno = this.formHv.get('paternalLastName').value;
    this.curriculum.apellidoMaterno = this.formHv.get('maternalLastName').value;
    this.curriculum.correoElectronico = this.formHv.get('email').value;
    this.curriculum.telefonoCelular = `57${String(this.formHv.get('phone').value)}`;

    this.curriculum.fechaNacimiento = this.pipe.transform(this.formHv.get('birthDate').value, this.dateFormat);

    this.curriculum.genero = this.formHv.get('gender').value;
    this.curriculum.dicCiudadResidencia = this.formHv.get('residenceCity').value;
    this.curriculum.direccionResidencia = this.formHv.get('residenceAddress').value;
    this.curriculum.dicProfesion = this.formHv.get('ocupation').value;
    this.curriculum.anosExperiencia = this.formHv.get('expirience').value;
    this.curriculum.dicAspiracionSalarial = this.formHv.get('salary').value;
    this.curriculum.paisesTrabajar = this.formHv.get('countries').value;
    this.curriculum.dicAreaTrabajo = this.formHv.get('area').value;
    this.curriculum.descripcionPerfilProfesional = this.formHv.get('descripcion').value;
    this.curriculum.dicDepartamento = this.formHv.get('departamento').value;

    let movilidad: string;

    if (this.formHv.get('canTrip').value == true)
      movilidad = 'S';
    else
      movilidad = 'N';



    if (this.formHv.get('canChange').value == true)
      movilidad += 'S';
    else
      movilidad += 'N';

    this.curriculum.movilidadLaboral = movilidad;

    let socialNetworks = {
      facebook: this.formHv.get('facebook').value,
      linkedin: this.formHv.get('linkedin').value,
      otro: this.formHv.get('other').value
    }

    this.curriculum.redesSociales = JSON.stringify(socialNetworks);
    this.curriculum.paisesTrabajar = JSON.stringify(this.paisesTrabajar);
    this.curriculum.idiomaNivel = JSON.stringify(this.idiomasSeleccionado);

    console.log(this.curriculum);
    

    this.curriculumService.saveCurriculum(this.curriculum).subscribe(
      (data: any) => {
        this.loader = false;

        window.scroll(0, 0);

        Swal.fire({
          title: 'Guardado',
          text: 'Se han guardado los datos personales.',
          type: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          this.showFirstTime();
          this.step++;
          document.getElementById('hTabEducacion').click();
        });


      },
      (error: any) => {
        this.loader = false;
        console.log(error);
      }
    );
  }

  // Test
  //Cargar Archivos
  uploadFile() {
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

    this.curriculumArchivos.idUsuario = this.user.idUsuario;
    this.curriculumArchivos.imagenBase64 = this.imageSrc.split("base64,")[1];
    this.curriculumArchivos.idImagen = this.imageSrc.split("base64,")[0] + "base64,";
    this.curriculumArchivos.tipoArchivo = "imagen";

    this.curriculumService.savePhotoCurriculum(this.curriculumArchivos).subscribe(
      (data: any) => {
        this.loaded = false;

        Swal.fire({
          title: 'OK',
          text: 'La foto fue cargada.',
          type: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.curriculumArchivos.imagenBase64 = this.imageSrc;
      },
      (error: any) => {
        this.loader = false;
        console.log(error);
      }
    );
  }

  //Metodo agregar Pais.
  onCountryChanged(data: any) {
    if (data != null && data.id != null && !this.paisesTrabajar.includes(data.id))
      this.paisesTrabajar.push(+data.id);
    this.formHv.get('country').setValue(null);
  }

  //Metodo eliminar Pais.
  onRemoveCountry(paisTrabajar: number) {
    var index = this.paisesTrabajar.indexOf(paisTrabajar);
    this.paisesTrabajar.splice(index, 1);
  }

  getPlantillasHTML() {
    this.curriculumService.getPdfTemplates()
      .subscribe(
        (data: any) => {
          this.plantillas = data;
          this.plantillas = this.plantillas.filter(b => b.vigente);
        },
        (error: any) => console.log(error)
      );
  }

  // Metodo inicial
  ngOnInit() {



    if (this.login.isActive()) {
      this.log.addLog('Hoja de vida', 'Ingresó a la hoja de vida');
    }
    // Verificacion si existe sesion
    this.login.verifySesion();

    // Cargar plantillas HTML
    this.getPlantillasHTML()

    // Asignacion de datos al objeto usuairo
    this.user = this.login.getDataUser();

    this.redesSociales = {
      facebook: "",
      linkedin: "",
      otro: ""
    }

    this.entInfoEducativa = {
      idInformacionEducativa: null,
      idDatosPersonales: this.curriculum.idDatosPersonales,
      idUsuario: this.user.idUsuario,
      dicAreaEstudio: null,
      dicCiudadEstudio: null,
      dicIntensidadEstudio: null,
      institucionEducativa: null,
      dicNivelEducativo: null,
      dicTipoEstudio: null,
      tituloObtenido: null,
      estadoEstudio: '',
      otroEstudio: null,
      fechaInicio: null,
      fechaFin: null,
      fechaCreacion: null,
      fechaActualizacion: null,
      vigente: true,
      dicPaisExtranjero: null,
      descripcionEducacion: ''
    }

    this.entInfoComplementaria = {
      idInformacionEducativa: null,
      idDatosPersonales: this.curriculum.idDatosPersonales,
      idUsuario: this.user.idUsuario,
      dicAreaEstudio: null,
      dicCiudadEstudio: null,
      dicIntensidadEstudio: null,
      institucionEducativa: null,
      dicNivelEducativo: null,
      dicTipoEstudio: null,
      tituloObtenido: null,
      estadoEstudio: '',
      otroEstudio: null,
      fechaInicio: null,
      fechaFin: null,
      fechaCreacion: null,
      fechaActualizacion: null,
      vigente: true,
      dicPaisExtranjero: null,
      descripcionEducacion: ''
    }

    this.entExperienciaLaboral = {
      idExperienciaLaboral: null,
      idDatosPersonales: this.curriculum.idDatosPersonales,
      empresa: null,
      cargo: null,
      funcioneslogros: null,
      trabajoActualmente: null,
      fechaIngreso: null,
      fechaSalida: null,
      fechaCreacion: null,
      fechaActualizacion: null,
      vigente: true
    };

    this.curriculumBool = {
      idDatosPersonalesBool: false,
      idUsuarioBool: false,
      idPlantillaAplicadaBool: false,
      dicCiudadResidenciaBool: false,
      dicTipoDocumentoBool: false,
      dicProfesionBool: false,
      dicAreaTrabajoBool: false,
      dicAspiracionSalarialBool: false,
      nombresBool: false,
      apellidoPaternoBool: false,
      apellidoMaternoBool: false,
      rutaFotoBool: false,
      identificacionBool: false,
      correoElectronicoBool: false,
      telefonoCelularBool: false,
      direccionResidenciaBool: false,
      anosExperienciaBool: false,
      paisesTrabajarBool: false,
      redesSocialesBool: false,
      descripcionPerfilProfesionalBool: false,
      generoBool: false,
      movilidadLaboralBool: false,
      idiomaNivelBool: false,
      habilidadesBool: false,
      fechaNacimientoBool: false,
      fechaCreacionBool: false,
      fechaActualizacionBool: false,
      vigenteBool: false
    }

    this.entIdioma = {
      id: "",
      nivel: ""
    }
    this.showCurriculumVitae();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.login.isActive()) {
      this.log.addLog('Hoja de vida', 'Salió de la hoja de vida');
    }
  }

  onlyLetter(letter) {
    if (letter != 2) {
      return true;
    } else {
      return false;
    }
  }

  volver(){
    this.count--;
  }

  initialize() {
    this.count = 0;
    this.countError = 0;
    this.errorTipo = false;
    this.errorNum = false;
    this.message = "";
  }

  //Metodo que muestra la hoja de vida
  showCurriculumVitae() {
    window.scroll(0, 0);

    this.showCurriculum = true;

    this.localeService.use('es');

    var promise = new Promise((resolve, reject) => {
      this.getInstituciones();
      this.getTipoDocumento();
      this.getProfesion();
      this.getArea();
      this.getaspiracionSalarial();
      this.getPaises();
      this.getNivelEducativo();
      this.getCiudad();
      this.getTipoEstudio();
      this.getIntensidadHoraria();
      this.getIdiomas();
      this.getHabilidades();
      this.getAniosExperiencia(50);
      this.getDepartamentos();
      resolve();
    }).then(() => {
      this.getPhoto(this.user.idUsuario);
      this.getObtenerDatosCurriculum();
    });
  }

  //Metodo para obtener los datos del curriculum
  getObtenerDatosCurriculum() {
    this.loader = true;
    this.curriculumService.getCurriculum(this.user.idUsuario)
      .subscribe(
        (data: any) => {
          this.loader = false;

          this.step++;
          this.curriculum = data;
          // Asignar valores iniciales al form de validacoin
          this.formHv.get('names').setValue(this.curriculum.nombres);
          this.formHv.get('paternalLastName').setValue(this.curriculum.apellidoPaterno);
          this.formHv.get('maternalLastName').setValue(this.curriculum.apellidoMaterno);
          this.formHv.get('documentType').setValue(this.curriculum.dicTipoDocumento);
          this.formHv.get('document').setValue(this.curriculum.identificacion);
          this.formHv.get('email').setValue(this.curriculum.correoElectronico);
          this.formHv.get('phone').setValue(String(this.curriculum.telefonoCelular).substring(2, String(this.curriculum.telefonoCelular).length));
          this.formHv.get('birthDate').setValue(new Date(this.curriculum.fechaNacimiento));

          this.formHv.get('gender').setValue(this.curriculum.genero);
          this.formHv.get('residenceCity').setValue(this.curriculum.dicCiudadResidencia);
          this.formHv.get('departamento').setValue(this.curriculum.dicDepartamento);
          this.formHv.get('residenceAddress').setValue(this.curriculum.direccionResidencia);
          this.formHv.get('ocupation').setValue(this.curriculum.dicProfesion);
          this.formHv.get('expirience').setValue(this.curriculum.anosExperiencia);
          this.formHv.get('salary').setValue(this.curriculum.dicAspiracionSalarial);
          this.formHv.get('area').setValue(this.curriculum.dicAreaTrabajo);
          this.formHv.get('country').setValue(null);
          this.formHv.get('descripcion').setValue(this.curriculum.descripcionPerfilProfesional);

          // console.log(this.formHv.value);
          

          if (data.movilidadLaboral != null) {
            if (data.movilidadLaboral.substring(0, 1) == 'S')
              this.formHv.get('canTrip').setValue(true);

            if (data.movilidadLaboral.substring(1, 2) == 'S')
              this.formHv.get('canChange').setValue(true);
          }

          //Obtiene las redes sociales.
          if (data.redesSociales != null) {
            this.redesSociales = JSON.parse(data.redesSociales);
            this.formHv.get('facebook').setValue(this.redesSociales.facebook);
            this.formHv.get('linkedin').setValue(this.redesSociales.linkedin);
            this.formHv.get('other').setValue(this.redesSociales.otro);


            this.socials[0].value = this.redesSociales.linkedin;
            this.socials[1].value = this.redesSociales.facebook;
            this.socials[2].value = this.redesSociales.otro;
          }

          //Obtiene los paises a trabajar.
          if (data.paisesTrabajar != null) {
            this.paisesTrabajar = JSON.parse(data.paisesTrabajar);
          }

          if (data.idiomaNivel != null) {
            this.idiomasSeleccionado = JSON.parse(data.idiomaNivel);
          }

          if (data.EntHojaVidaInformacionEducativa != null) {
            this.infoEducativa = data.EntHojaVidaInformacionEducativa.filter(x => x.esComplementario == false);
            this.infoComplementaria = data.EntHojaVidaInformacionEducativa.filter(x => x.esComplementario == true);
          }

          if (data.EntExperienciaLaboral != null) {
            this.infoLaboral = data.EntExperienciaLaboral;
            if(this.infoLaboral.length==0){
              this.initializeInfoLaboral(0);
            }
          }

          if (data.habilidades != null) {
            this.habilidadesTrabajar = JSON.parse(data.habilidades);
          }
          if (this.curriculum.IdPlantillaAplicada > 0) {
            this.iPlantilla = this.curriculum.IdPlantillaAplicada;
            this.idPlantillaAplicada = this.curriculum.IdPlantillaAplicada;
            this.colorPlantilla = this.curriculum.colorHV;
            this.tipoTextoPlantilla = this.curriculum.tipoTextoHV;
          } else {
            this.colorPlantilla = this.jsonColores[0]["colorHex"];
            this.tipoTextoPlantilla = this.jsonTextoTipos[0]["tipoTextoStyle"];
          }
        },
        (error: any) => {
          this.loader = false;
          console.log(error);
        }
      );
  }

  getHabilidades() {
    this.diccionarioService.getDiccionario(1004)
      .subscribe(
        (data: any) => {
          this.habilidades = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  getInstituciones() {
    this.diccionarioService.getDiccionario(1005)
      .subscribe(
        (data: any) => {
          this.instituciones = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  getTipoDocumento() {
    this.diccionarioService.getDiccionario(1)
      .subscribe(
        (data: any) => {
          this.tiposDocumento = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener las profesiones.
  getProfesion() {
    this.diccionarioService.getDiccionario(2)
      .subscribe(
        (data: any) => {
          this.profesiones = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener las areas.
  getArea() {
    this.diccionarioService.getDiccionario(3)
      .subscribe(
        (data: any) => {
          this.areas = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener las aspiraciones salariales.
  getaspiracionSalarial() {
    this.diccionarioService.getDiccionario(4)
      .subscribe(
        (data: any) => {
          this.aspiracionSalarial = data.data;
          this.sortByKey(this.aspiracionSalarial,"id");
          // console.log(this.aspiracionSalarial);
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener los paises.
  getPaises() {
    this.diccionarioService.getDiccionario(5)
      .subscribe(
        (data: any) => {
          this.paises = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener el nivel educativo.
  getNivelEducativo() {
    this.diccionarioService.getDiccionario(6)
      .subscribe(
        (data: any) => {
          this.nivelEducativo = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener las ciudades.
  getCiudad() {
    this.diccionarioService.getDiccionario(7)
      .subscribe(
        (data: any) => {
          this.ciudades = data.data;
          this.ciudadesHV = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener las departamentos.
  getDepartamentos() {
    this.diccionarioService.getDiccionario(1006)
      .subscribe(
        (data: any) => {
          this.departamentos = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener el tipo de estudio.
  getTipoEstudio() {
    this.diccionarioService.getDiccionario(8)
      .subscribe(
        (data: any) => {
          this.tipoEstudio = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener la intensidad horaria.
  getIntensidadHoraria() {
    this.diccionarioService.getDiccionario(9)
      .subscribe(
        (data: any) => {
          this.intensidadHoraria = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener los idiomas.
  getIdiomas() {
    this.diccionarioService.getDiccionario(10)
      .subscribe(
        (data: any) => {
          this.idiomas = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  //Metodo para obtener la foto.
  getPhoto(_id: number) {
    this.curriculumService.getPhotoCurriculum(_id).subscribe(
      (data: any) => {
        if (String(data).startsWith('data')) {
          this.curriculumArchivos.imagenBase64 = data;
        } else {
          this.curriculumArchivos.imagenBase64 = "data:image/jpeg;base64,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";
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getAniosExperiencia(n: number) {
    for (var _i = 0; _i < n; _i++) {
      const anio: Diccionario = {};
      anio.id = (_i + 1).toString();
      anio.text = (_i + 1).toString();

      this.aniosExperiencia.push(anio);
    }
  }


  ///INFORMACION EDUCATIVA
  initializeInfoEducativa(_id) {
    this.muestraFormularioEducacion = true;

    if (_id == 0) {
      this.entInfoEducativa = {
        idInformacionEducativa: null,
        idDatosPersonales: this.curriculum.idDatosPersonales,
        idUsuario: this.user.idUsuario,
        dicAreaEstudio: null,
        dicCiudadEstudio: null,
        dicIntensidadEstudio: null,
        institucionEducativa: null,
        dicNivelEducativo: null,
        dicTipoEstudio: null,
        tituloObtenido: null,
        estadoEstudio: '',
        otroEstudio: null,
        fechaInicio: null,
        fechaFin: null,
        fechaCreacion: null,
        fechaActualizacion: null,
        esComplementario: false,
        vigente: true,
        dicPaisExtranjero: null,
        descripcionEducacion: ''
      }

      this.formStudy.get('institucionEducativa').setValue(this.entInfoEducativa.institucionEducativa);
      this.formStudy.get('dicNivelEducativo').setValue(this.entInfoEducativa.dicNivelEducativo);
      this.formStudy.get('tituloObtenido').setValue(this.entInfoEducativa.tituloObtenido);
      this.formStudy.get('dicAreaEstudio').setValue(this.entInfoEducativa.dicAreaEstudio);
      this.formStudy.get('estadoEstudio').setValue(this.entInfoEducativa.estadoEstudio);
      this.formStudy.get('dicCiudadEstudio').setValue(this.entInfoEducativa.dicCiudadEstudio);

      this.formStudy.get('fechaInicio').setValue(new Date());
      this.formStudy.get('fechaFin').setValue(new Date());

      this.formStudy.get('estudioExtranjero').setValue(this.entInfoEducativa.dicPaisExtranjero);
      this.formStudy.get('descripcionEducacion').setValue(this.entInfoEducativa.descripcionEducacion);

      this.modeEducativa = 'new';
    } else {
      this.entInfoEducativa = this.infoEducativa.find(x => x.idInformacionEducativa == _id);

      this.formStudy.get('institucionEducativa').setValue(this.entInfoEducativa.institucionEducativa);
      this.formStudy.get('dicNivelEducativo').setValue(this.entInfoEducativa.dicNivelEducativo);
      this.formStudy.get('tituloObtenido').setValue(this.entInfoEducativa.tituloObtenido);
      this.formStudy.get('dicAreaEstudio').setValue(this.entInfoEducativa.dicAreaEstudio);
      this.formStudy.get('estadoEstudio').setValue(this.entInfoEducativa.estadoEstudio);
      this.formStudy.get('dicCiudadEstudio').setValue(this.entInfoEducativa.dicCiudadEstudio);

      this.formStudy.get('fechaInicio').setValue(new Date(this.entInfoEducativa.fechaInicio));
      this.formStudy.get('fechaFin').setValue(new Date(this.entInfoEducativa.fechaFin));

      this.formStudy.get('estudioExtranjero').setValue(this.entInfoEducativa.dicPaisExtranjero);
      this.formStudy.get('descripcionEducacion').setValue(this.entInfoEducativa.descripcionEducacion);

      this.modeEducativa = 'update';
    }
  }

  saveInfoEducativa() {
    this.submitted2 = true;

    if (this.formStudy.invalid) {
      Swal.fire({
        title: 'Ops!',
        text: `Debes diligenciar los campos que son obligatorios.`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Asignación de valores a entidad para inserción

    this.entInfoEducativa.dicAreaEstudio = this.formStudy.get('dicAreaEstudio').value;
    this.entInfoEducativa.dicCiudadEstudio = this.formStudy.get('dicCiudadEstudio').value;
    this.entInfoEducativa.institucionEducativa = this.formStudy.get('institucionEducativa').value;
    this.entInfoEducativa.dicNivelEducativo = this.formStudy.get('dicNivelEducativo').value;
    this.entInfoEducativa.tituloObtenido = this.formStudy.get('tituloObtenido').value;
    this.entInfoEducativa.estadoEstudio = this.formStudy.get('estadoEstudio').value;
    this.entInfoEducativa.fechaInicio = this.formStudy.get('fechaInicio').value;
    this.entInfoEducativa.dicPaisExtranjero = this.formStudy.get('estudioExtranjero').value;
    this.entInfoEducativa.descripcionEducacion = this.formStudy.get('descripcionEducacion').value;
    this.entInfoEducativa.fechaFin = this.formStudy.get('fechaFin').value;
    this.entInfoEducativa.idDatosPersonales = this.curriculum.idDatosPersonales;
    if (this.entInfoEducativa.estadoEstudio == 'Finalizado') {
      if (new Date(this.formStudy.get('fechaInicio').value) > new Date(this.formStudy.get('fechaFin').value)) {
        Swal.fire({
          title: 'Ops!',
          text: 'La fecha inicio no puede ser mayor a la de finalización.',
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }

    this.loader = true;

    if (this.modeEducativa == 'new') {
      //guardar
      this.curriculumService.saveInfoEducativa(this.entInfoEducativa)
        .subscribe(
          (data: any) => {

            this.loader = false;

            this.infoEducativa.push(data.data);

            Swal.fire({
              title: 'Educación',
              text: 'Registro Agregado Correctamente',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.submitted2 = false;
            this.muestraFormularioEducacion = false;
            //document.getElementById('btnCerrarEducativa').click();
          },
          (error: any) => {
            this.loader = false;
            console.log(error);
          }
        );
    } else {
      //modificar

      this.curriculumService.editInfoEducativa(this.entInfoEducativa)
        .subscribe(
          (data: any) => {
            this.loader = false;

            Swal.fire({
              title: 'Educación',
              text: 'Registro Guardado Correctamente',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.submitted2 = false;
            this.muestraFormularioEducacion = false;
            //document.getElementById('btnCerrarEducativa').click();
          },
          (error: any) => {
            this.loader = false;
            console.log(error);
          }
        );
    }

    this.formStudy.get('dicAreaEstudio').setValue('');
    this.formStudy.get('dicCiudadEstudio').setValue('');
    this.formStudy.get('institucionEducativa').setValue('');
    this.formStudy.get('dicNivelEducativo').setValue('');
    this.formStudy.get('tituloObtenido').setValue('');
    this.formStudy.get('estadoEstudio').setValue('');
    this.formStudy.get('fechaInicio').setValue('');
    this.formStudy.get('estudioExtranjero').setValue('');
    this.formStudy.get('descripcionEducacion').setValue('');
    this.formStudy.get('fechaFin').setValue('');
  }

  //Metodo para eliminar la información educativa.
  deleteInfoEducativa(_id) {
    Swal.fire({
      title: '¿Esta seguro que desea eliminar el registro?',
      text: 'no podra revertir este cambio.',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.loader = true;
        this.curriculumService.deleteInfoEducativa(_id)
          .subscribe(
            (data: any) => {
              this.loader = false;

              let info = this.infoEducativa.findIndex(x => x.idInformacionEducativa == _id);

              this.infoEducativa.splice(info, 1);

              Swal.fire({
                title: 'Eliminado!',
                text: 'El Registro fue eliminado Correctamente',
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
            },
            (error: any) => {
              this.loader = false;
              console.log(error);
            }
          );
      }
    });
  }
  ///FIN INFORMACION EDUCATIVA

  ///INICIO INFORMACION EDUCATIVA COMPLEMENTARIA
  initializeInfoComplementario(_id) {

    this.muestraFormularioComplementario = true;

    if (_id == 0) {
      this.entInfoComplementaria = {
        idInformacionEducativa: null,
        idDatosPersonales: this.curriculum.idDatosPersonales,
        idUsuario: this.user.idUsuario,
        dicAreaEstudio: null,
        dicCiudadEstudio: null,
        dicIntensidadEstudio: null,
        institucionEducativa: null,
        dicNivelEducativo: null,
        dicTipoEstudio: null,
        tituloObtenido: null,
        estadoEstudio: '',
        otroEstudio: null,
        fechaInicio: null,
        fechaFin: null,
        fechaCreacion: null,
        fechaActualizacion: null,
        esComplementario: true,
        vigente: true,
        dicPaisExtranjero: null,
        descripcionEducacion: ''
      }

      this.modeComplementario = 'new';

      this.formComplementary.get('dicAreaEstudio').setValue(this.entInfoComplementaria.dicAreaEstudio);
      this.formComplementary.get('dicCiudadEstudio').setValue(this.entInfoComplementaria.dicCiudadEstudio);
      this.formComplementary.get('institucionEducativa').setValue(this.entInfoComplementaria.institucionEducativa);
      this.formComplementary.get('tituloObtenido').setValue(this.entInfoComplementaria.tituloObtenido);
      this.formComplementary.get('estadoEstudio').setValue(this.entInfoComplementaria.estadoEstudio);
      this.formComplementary.get('fechaInicio').setValue(new Date());
      this.formComplementary.get('fechaFin').setValue(new Date());
      this.formComplementary.get('dicIntensidadEstudio').setValue(this.entInfoComplementaria.dicIntensidadEstudio);
      this.formComplementary.get('otroEstudio').setValue(this.entInfoComplementaria.otroEstudio);
      this.formComplementary.get('dicTipoEstudio').setValue(this.entInfoComplementaria.dicTipoEstudio);
      this.formComplementary.get('estudioExtranjero').setValue(this.entInfoComplementaria.dicPaisExtranjero);
      this.formComplementary.get('descripcionEducacion').setValue(this.entInfoComplementaria.descripcionEducacion);

    } else {
      this.entInfoComplementaria = this.infoComplementaria.find(x => x.idInformacionEducativa == _id);

      this.modeComplementario = 'update';

      this.formComplementary.get('dicAreaEstudio').setValue(this.entInfoComplementaria.dicAreaEstudio);
      this.formComplementary.get('dicCiudadEstudio').setValue(this.entInfoComplementaria.dicCiudadEstudio);
      this.formComplementary.get('institucionEducativa').setValue(this.entInfoComplementaria.institucionEducativa);
      this.formComplementary.get('tituloObtenido').setValue(this.entInfoComplementaria.tituloObtenido);
      this.formComplementary.get('estadoEstudio').setValue(this.entInfoComplementaria.estadoEstudio);
      this.formComplementary.get('fechaInicio').setValue(new Date(this.entInfoComplementaria.fechaInicio));
      this.formComplementary.get('fechaFin').setValue(new Date(this.entInfoComplementaria.fechaFin));
      this.formComplementary.get('dicIntensidadEstudio').setValue(this.entInfoComplementaria.dicIntensidadEstudio);
      this.formComplementary.get('otroEstudio').setValue(this.entInfoComplementaria.otroEstudio);
      this.formComplementary.get('dicTipoEstudio').setValue(this.entInfoComplementaria.dicTipoEstudio);
      this.formComplementary.get('estudioExtranjero').setValue(this.entInfoComplementaria.dicPaisExtranjero);
      this.formComplementary.get('descripcionEducacion').setValue(this.entInfoComplementaria.descripcionEducacion);

    }
  }

  saveInfoComplementario() {

    this.submitted3 = true;

    if (this.formComplementary.invalid) {
      Swal.fire({
        title: 'Ops!',
        text: `Debes diligenciar los campos que son obligatorios.`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Asignación de valores a entidad para inserción
    this.entInfoComplementaria.dicAreaEstudio = this.formComplementary.get('dicAreaEstudio').value;
    this.entInfoComplementaria.dicCiudadEstudio = this.formComplementary.get('dicCiudadEstudio').value;
    this.entInfoComplementaria.institucionEducativa = this.formComplementary.get('institucionEducativa').value;
    this.entInfoComplementaria.tituloObtenido = this.formComplementary.get('tituloObtenido').value;
    this.entInfoComplementaria.estadoEstudio = this.formComplementary.get('estadoEstudio').value;
    this.entInfoComplementaria.fechaInicio = this.formComplementary.get('fechaInicio').value;
    this.entInfoComplementaria.fechaFin = this.formComplementary.get('fechaFin').value;
    this.entInfoComplementaria.dicIntensidadEstudio = this.formComplementary.get('dicIntensidadEstudio').value;
    this.entInfoComplementaria.otroEstudio = this.formComplementary.get('otroEstudio').value;
    this.entInfoComplementaria.dicTipoEstudio = this.formComplementary.get('dicTipoEstudio').value;
    this.entInfoComplementaria.dicPaisExtranjero = this.formComplementary.get('estudioExtranjero').value;
    this.entInfoComplementaria.descripcionEducacion = this.formComplementary.get('descripcionEducacion').value;
    this.entInfoComplementaria.idDatosPersonales = this.curriculum.idDatosPersonales;

    if (this.entInfoComplementaria.estadoEstudio == 'Finalizado') {
      if (new Date(this.formComplementary.get('fechaInicio').value) > new Date(this.formComplementary.get('fechaFin').value)) {
        Swal.fire({
          title: 'Ops!',
          text: 'La fecha inicio no puede ser mayor a la de finalización.',
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }

    this.loader = true;
    if (this.modeComplementario == 'new') {
      //guardar
      this.curriculumService.saveInfoComplementaria(this.entInfoComplementaria)
        .subscribe(
          (data: any) => {
            this.loader = false;
            this.infoComplementaria.push(data.data);

            Swal.fire({
              title: 'Educación',
              text: 'Registro Agregado Correctamente',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });

            this.submitted3 = false;
            this.muestraFormularioComplementario = false;
            // document.getElementById('btnCerrarComplementaria').click();
          },
          (error: any) => {
            this.loader = false;
            console.log(error);
          }
        );
    } else {
      //modificar
      this.curriculumService.editInfoComplementaria(this.entInfoComplementaria)
        .subscribe(
          (data: any) => {
            this.loader = false;
            Swal.fire({
              title: 'Educación',
              text: 'Registro Guardado Correctamente',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });

            this.submitted3 = false;
            this.muestraFormularioComplementario = false;
            //document.getElementById('btnCerrarComplementaria').click();
          },
          (error: any) => {
            this.loader = false;
            console.log(error);
          }
        );
    }
    this.formComplementary.get('dicAreaEstudio').setValue('');
    this.formComplementary.get('dicCiudadEstudio').setValue('');
    this.formComplementary.get('institucionEducativa').setValue('');
    this.formComplementary.get('tituloObtenido').setValue('');
    this.formComplementary.get('estadoEstudio').setValue('');
    this.formComplementary.get('fechaInicio').setValue('');
    this.formComplementary.get('fechaFin').setValue('');
    this.formComplementary.get('dicIntensidadEstudio').setValue('');
    this.formComplementary.get('otroEstudio').setValue('');
    this.formComplementary.get('dicTipoEstudio').setValue('');
    this.formComplementary.get('estudioExtranjero').setValue('');
    this.formComplementary.get('descripcionEducacion').setValue('');
  }

  deleteInfoComplementaria(_id) {
    Swal.fire({
      title: '¿Esta seguro que desea eliminar el registro?',
      text: 'no podra revertir este cambio.',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.loader = true;
        this.curriculumService.deleteInfoEducativa(_id)
          .subscribe(
            (data: any) => {
              this.loader = false;

              let info = this.infoComplementaria.findIndex(x => x.idInformacionEducativa == _id);

              this.infoComplementaria.splice(info, 1);

              Swal.fire({
                title: 'Eliminado!',
                text: 'El Registro fue eliminado Correctamente',
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
            },
            (error: any) => {
              this.loader = false;
              console.log(error);
            }
          );
      }
    });
  }
  ///FIN INFORMACION EDUCATIVA COMPLEMETARIA

  ///INICIO EXPERIENCIA LABORAL
  initializeInfoLaboral(_id) {
    this.muestraFormularioExperiencia = true;

    if (_id == 0) {

      this.entExperienciaLaboral = {
        idExperienciaLaboral: null,
        idDatosPersonales: this.curriculum.idDatosPersonales,
        empresa: null,
        cargo: null,
        funcioneslogros: null,
        trabajoActualmente: null,
        fechaIngreso: null,
        fechaSalida: null,
        fechaCreacion: null,
        fechaActualizacion: null,
        vigente: true
      };

      this.modeExperiencia = 'new';

      this.formLabor.get('empresa').setValue(this.entExperienciaLaboral.empresa);
      this.formLabor.get('cargo').setValue(this.entExperienciaLaboral.cargo);
      this.formLabor.get('funcioneslogros').setValue(this.entExperienciaLaboral.funcioneslogros);
      this.formLabor.get('fechaIngreso').setValue(new Date());
      this.formLabor.get('fechaSalida').setValue(new Date());
      this.formLabor.get('currentJob').setValue(this.entExperienciaLaboral.trabajoActualmente == 'S' ? true : false);

    } else {
      this.entExperienciaLaboral = this.infoLaboral.find(x => x.idExperienciaLaboral == _id);
      this.modeExperiencia = 'update';

      this.formLabor.get('empresa').setValue(this.entExperienciaLaboral.empresa);
      this.formLabor.get('cargo').setValue(this.entExperienciaLaboral.cargo);
      this.formLabor.get('funcioneslogros').setValue(this.entExperienciaLaboral.funcioneslogros);
      this.formLabor.get('fechaIngreso').setValue(new Date(this.entExperienciaLaboral.fechaIngreso));
      this.formLabor.get('fechaSalida').setValue(new Date(this.entExperienciaLaboral.fechaSalida));
      this.formLabor.get('currentJob').setValue(this.entExperienciaLaboral.trabajoActualmente == 'S' ? true : false);

    }
  }

  //Metodo para guardar la información laboral.
  saveInfoLaboral() {
    this.submitted4 = true;

    if (this.formLabor.invalid) {
      Swal.fire({
        title: 'Ops!',
        text: `Debes diligenciar los campos que son obligatorios.`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Asignación laboral 
    this.entExperienciaLaboral.empresa = this.formLabor.get('empresa').value;
    this.entExperienciaLaboral.cargo = this.formLabor.get('cargo').value;
    this.entExperienciaLaboral.funcioneslogros = this.formLabor.get('funcioneslogros').value;
    this.entExperienciaLaboral.fechaIngreso = this.formLabor.get('fechaIngreso').value;
    this.entExperienciaLaboral.fechaSalida = this.formLabor.get('fechaSalida').value;
    this.entExperienciaLaboral.trabajoActualmente = this.formLabor.get('currentJob').value == true ? 'S' : 'N';
    if (this.formLabor.get('currentJob').value == false) {
      if (new Date(this.formLabor.get('fechaIngreso').value) > new Date(this.formLabor.get('fechaSalida').value)) {
        Swal.fire({
          title: 'Ops!',
          text: 'La fecha inicio no puede ser mayor a la de finalización.',
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }


    this.loader = true;

    if (this.modeExperiencia == 'new') {
      //guardar
      this.curriculumService.saveInfoLaboral(this.entExperienciaLaboral)
        .subscribe(
          (data: any) => {
            this.loader = false;

            this.infoLaboral.push(data.data);

            Swal.fire({
              title: 'Guardado',
              text: 'Registro Agregado Correctamente',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });

            this.submitted4 = false;
            this.muestraFormularioExperiencia = false;
            //document.getElementById('btnCerrarExperiencia').click();
          },
          (error: any) => {
            this.loader = false;
            console.log(error);
          }
        );
    } else {
      //modificar
      this.curriculumService.editInfoLaboral(this.entInfoComplementaria)
        .subscribe(
          (data: any) => {
            this.loader = false;

            Swal.fire({
              title: 'Guardado',
              text: 'Registro Guardado Correctamente',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.submitted4 = false;
            this.muestraFormularioExperiencia = false;
            //document.getElementById('btnCerrarExperiencia').click();
          },
          (error: any) => {
            this.loader = false;
            console.log(error);
          }
        );
    }

    this.formLabor.get('empresa').setValue('');
    this.formLabor.get('cargo').setValue('');
    this.formLabor.get('funcioneslogros').setValue('');
    this.formLabor.get('fechaIngreso').setValue('');
    this.formLabor.get('fechaSalida').setValue('');
    this.formLabor.get('currentJob').setValue('');
  }

  deleteInfoLaboral(_id) {
    Swal.fire({
      title: '¿Esta seguro que desea eliminar el registro?',
      text: 'no podra revertir este cambio.',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.loader = true;

        this.curriculumService.deleteInfoLaboral(_id)
          .subscribe(
            (data: any) => {
              this.loader = false;

              let info = this.infoLaboral.findIndex(x => x.idExperienciaLaboral == _id);

              this.infoLaboral.splice(info, 1);
              if(this.infoLaboral.length==0){
                this.initializeInfoLaboral(0);
              }
              Swal.fire({
                title: 'Eliminado!',
                text: 'El Registro fue eliminado Correctamente',
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
            },
            (error: any) => {
              this.loader = false;
              console.log(error);

            }
          );
      }
    });
  }
  ///FIN EXPERIENCIA LABORAL


  ///INICIO INFORMACION IDIOMA
  initializeInfoIdioma(_id) {
    this.muestraFormularioIdioma = true;
    if (_id == 0) {
      this.entIdioma = {
        id: "",
        nivel: ""
      }

      this.modeIdioma = 'new';
    } else {
      this.entIdioma = this.idiomasSeleccionado.find(x => x.id == _id);

      this.modeIdioma = 'update';
    }
  }

  //Metodo para guardar el idioma.
  saveInfoIdioma() {
    if (this.modeIdioma == 'new') {
      //guardar
      let nuevoIdioma: any = {
        id: "",
        nivel: ""
      }

      nuevoIdioma.id = this.entIdioma.id;
      nuevoIdioma.nivel = this.entIdioma.nivel;

      this.idiomasSeleccionado.push(nuevoIdioma);

      this.guardarDatosCurriculum('Guardado', 'Registro Guardado Correctamente');
    }

    this.muestraFormularioIdioma = false;
    //document.getElementById('btnCerrarIdioma').click();

    this.entIdioma.id = '';
    this.entIdioma.nivel = '';

  }

  deleteInfoIdioma(_id) {
    Swal.fire({
      title: '¿Esta seguro que desea eliminar el registro?',
      text: 'no podra revertir este cambio.',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        let info = this.idiomasSeleccionado.findIndex(x => x.id == _id);

        this.idiomasSeleccionado.splice(info, 1);

        this.guardarDatosCurriculum('Eliminado!', 'El Registro fue eliminado Correctamente');
      }
    });
  }

  ///FIN INFORMACION IDIOMA

  ///Metodo para guardar los datos del datos del curriculum.
  finalizarDatosCurriculum() {
    this.loader = true;

    this.curriculum.idiomaNivel = JSON.stringify(this.idiomasSeleccionado);

    this.curriculumService.saveCurriculum(this.curriculum).subscribe(
      (data: any) => {
        this.loader = false;

        window.scroll(0, 0);

        this.curriculumService.setPersonalization(this.user.idUsuario, "%23" + this.colorPlantilla, this.tipoTextoPlantilla, this.idPlantillaAplicada).subscribe(
          (data: any) => {
            this.curriculumService.getPdfCurriculum(this.user.idUsuario).subscribe(
              (data: any) => {
                this.pdf = 'data:application/pdf;base64, ' + data;
                document.querySelector("iframe").src = this.pdf;
                console.log(data);
              },
              (error: any) => console.log(error)
            );
          },
          (error: any) => console.log(error)
        );


        Swal.fire({
          title: 'Guardado',
          text: '¡Has creado tu hoja de vida con éxito!.',
          type: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          this.created = true;
        });
      },
      (error: any) => {
        this.loader = false;

        console.log(error);

        Swal.fire({
          title: "Error",
          text: "Se produjo un error al intentar guardar.",
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }

  ///Metodo para guardar el paso de Educación.
  pasoEducacionlaboral() {
    this.loader = true;

    this.curriculum.idiomaNivel = JSON.stringify(this.idiomasSeleccionado);

    this.curriculumService.saveCurriculum(this.curriculum)
      .subscribe(
        (data: any) => {
          this.loader = false;

          window.scroll(0, 0);

          Swal.fire({
            title: 'Guardado',
            text: 'Se han guardado los datos de educación.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.step++;
            document.getElementById('hTabTrabajos').click();
          });
        },
        (error: any) => {
          this.loader = false;

          console.log(error);

          Swal.fire({
            title: "Error",
            text: "Se produjo un error al intentar guardar.",
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
  }

  ///Metodo para guardar Laboral a diseño.
  pasoLaboralDiseno() {
    this.loader = true;
    this.curriculum.idiomaNivel = JSON.stringify(this.idiomasSeleccionado);
    this.curriculum.habilidades = JSON.stringify(this.habilidadesTrabajar);

    this.curriculumService.saveCurriculum(this.curriculum)
      .subscribe(
        (data: any) => {
          this.loader = false;

          window.scroll(0, 0);

          Swal.fire({
            title: 'Guardado',
            text: 'Se han guardado los datos de información laboral.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.step++;
            document.getElementById('hTabDiseno').click();
          });
        },
        (error: any) => {
          this.loader = false;

          console.log(error);

          Swal.fire({
            title: "Error",
            text: "Se produjo un error al intentar guardar.",
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
  }

  //Metodo para guardar los datos del curriculum.
  guardarDatosCurriculum(titulo?: string, mensaje?: string) {
    this.loader = true;
    this.curriculum.idiomaNivel = JSON.stringify(this.idiomasSeleccionado);
    this.curriculumService.saveCurriculum(this.curriculum)
      .subscribe(
        (data: any) => {
          this.loader = false;

          Swal.fire({
            title: titulo,
            text: mensaje,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        },
        (error: any) => {
          this.loader = false;

          console.log(error);

          Swal.fire({
            title: "Error",
            text: "Se produjo un error al intentar guardar.",
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
  }

  ///Metodo para mostrar el agendamiento.
  showSchedule() {
    this.show = !this.show;
  }

  ///Metodo que verifica si es la primera vez que se esta ingresando al formulario.
  showFirstTime() {
    if (this.infoComplementaria.length == 0 && this.infoEducativa.length == 0 && this.idiomasSeleccionado.length == 0) {
      this.firstTime = true;
      this.initializeInfoComplementario(0);
      this.initializeInfoEducativa(0);
      this.initializeInfoIdioma(0);
    }
    if (this.infoLaboral.length == 0) {
      this.firstTime2 = true;
      this.initializeInfoLaboral(0);
    }
  }

  ///Metodo para descargar PDF
  descargarPdf() {
    const downloadLink = document.createElement("a");
    const fileName = "CurriculumVitae.pdf";

    downloadLink.href = this.pdf;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  //Metodo para agregar una habiliadad.
  onHabilityChanged(data) {
    if (data != null && data.id != null && !this.habilidadesTrabajar.includes(data.id))
      this.habilidadesTrabajar.push(+data.id);
    this.hab = null;
  }

  //Metodo eliminar una habilidad
  onRemoveHability(habilidadTrabajar: number) {
    var index = this.habilidadesTrabajar.indexOf(habilidadTrabajar);
    this.habilidadesTrabajar.splice(index, 1);
  }

  addSocial(e) {
    // console.log('add social ',e);
    // this.socials[e].value = document.getElementById('input'+(e+1)).value;
    if (e === 0) {
      this.socials[e].value = this.formHv.get('linkedin').value;
    } else if (e === 1) {
      this.socials[e].value = this.formHv.get('facebook').value;
    } else if (e === 2) {
      this.socials[e].value = this.formHv.get('other').value;
    }

    document.getElementById('form' + (e + 1)).style.display = 'none';
    // document.getElementById('input'+(e+1)).value='';
    // console.log(this.formHv.value);

  }

  deleteSocial(e) {
    // console.log('remove social ',e);
    this.socials[e].value = '';

    if (e === 0) {
      this.formHv.get('linkedin').setValue('');
    } else if (e === 1) {
      this.formHv.get('facebook').setValue('');
    } else if (e === 2) {
      this.formHv.get('other').setValue('');
    }
    // console.log(this.formHv.value);
  }

  toggleSocial(e) {
    // console.log('toggle social ', e);
    document.getElementById('form' + e).style.display = 'inline-block';
    document.getElementById('btn' + e).style.display = 'none';
  }

  cancellSocial(e) {
    // console.log('cancell social ', e);
    document.getElementById('form' + e).style.display = 'none';
    document.getElementById('btn' + e).style.display = 'block';
    if (e === 0) {
      this.formHv.get('linkedin').setValue('');
    } else if (e === 1) {
      this.formHv.get('facebook').setValue('');
    } else if (e === 2) {
      this.formHv.get('other').setValue('');
    }
    // console.log(this.formHv.value);
  }
  tabPersonalizacion() {
    this.step = 4
    var indexPlantilla = 0
    var html = "";
    var img = document.getElementById("imgHV").style.backgroundImage;
    for (var i = 0; i <= this.plantillas.length - 1; i++) {
      ;
      html = this.plantillas[i].htmlPlantilla;
      html = html.replace(/#Nombre/g, this.curriculum.nombres + " " + this.curriculum.apellidoPaterno);//reemplazamos los nombres y los apellidos.
      html = html.replace(/#identificacion/g, this.curriculum.identificacion);
      html = html.replace(/#nacimiento/g, this.curriculum.fechaNacimiento.toString());
      html = html.replace(/#direccion/g, this.curriculum.direccionResidencia);
      html = html.replace(/#fono/g, this.curriculum.telefonoCelular);
      html = html.replace(/#email/g, this.curriculum.correoElectronico);
      html = html.replace(/#descripcion/g, this.curriculum.descripcionPerfilProfesional);
      html = html.replace(/#colorHV/g, this.colorPlantilla);
      html = html.replace(/#imagen/g, img.replace('url("', '').replace('")', ''));
      $("#planFrame" + this.plantillas[i].idPlantilla).contents().find('html').html(html);
      $("#planFrame" + this.plantillas[i].idPlantilla).contents().find("html").attr("style", "zoom:0.3;overflow:hidden");
      if (this.plantillas[i].idPlantilla == this.iPlantilla) {
        indexPlantilla = i;
      }
    }
    var config: SwiperOptions = {
      initialSlide: indexPlantilla,
      effect: 'coverflow',
      grabCursor: true,
      observer: true,
      observeParents: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 1,
      coverflowEffect: {
        rotate: 0,
        stretch: 120,
        depth: 60,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: '.swiper-pagination',
      }

    };

    this.newSwiper = new Swiper('.swiper-container', config);
    this.seleccionarTipoTexto(this.tipoTextoPlantilla, this.colorPlantilla, indexPlantilla);

  }
  seleccionarPlantilla() {
    this.idPlantillaAplicada = this.plantillas[this.newSwiper.activeIndex].idPlantilla;
    var tp = this.tipoTextoPlantilla;
    var cp = this.colorPlantilla;
    var id = this.newSwiper.activeIndex
    setTimeout(() => {
      this.seleccionarTipoTexto(tp, cp, id);
    }, 500);
  }
  seleccionarTipoTexto(tipoTexto, color, idP) {
    var img = document.getElementById("imgHV").style.backgroundImage;
    var html = "";
    this.colorPlantilla = color;
    this.tipoTextoPlantilla = tipoTexto;
    html = this.plantillas[idP].htmlPlantilla;
    html = html.replace(/#Nombre/g, this.curriculum.nombres + " " + this.curriculum.apellidoPaterno);//reemplazamos los nombres y los apellidos.
    html = html.replace(/#identificacion/g, this.curriculum.identificacion);
    html = html.replace(/#nacimiento/g, this.curriculum.fechaNacimiento.toString());
    html = html.replace(/#direccion/g, this.curriculum.direccionResidencia);
    html = html.replace(/#fono/g, this.curriculum.telefonoCelular);
    html = html.replace(/#email/g, this.curriculum.correoElectronico);
    html = html.replace(/#descripcion/g, this.curriculum.descripcionPerfilProfesional);
    html = html.replace(/#colorHV/g, this.colorPlantilla);
    html = html.replace(/#imagen/g, img.replace('url("', '').replace('")', ''));
    $("#frameTipoTexto").contents().find('html').html(html);
    $("#frameTipoTexto").contents().find("html").attr("style", "zoom:0.5;overflow:hidden;font-family:'" + tipoTexto + "'");
    $("#frameColorPlantilla").contents().find('html').html(html);
    $("#frameColorPlantilla").contents().find("html").attr("style", "zoom:0.5;overflow:hidden;font-family:'" + tipoTexto + "'");
  }

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  sigSlide(){
    this.newSwiper.slideNext();
  }
  prevSlide(){
    this.newSwiper.slidePrev();
  }

  changeDepartment(e){
    // console.log(e);
    this.diccionarioService.getCities(e['id']).subscribe(
      res => {
        // console.log(res);
        this.ciudadesHV = res['data'];
      }
    )
    
  }
}