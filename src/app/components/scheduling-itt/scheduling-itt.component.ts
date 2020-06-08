import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BookingService } from "../../services/booking/booking.service";
import { LoginService } from "../../services/login.service";
import localeCO from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeCO, 'es-CO');

import Swal from 'sweetalert2';
import { CurriculumFile } from 'src/app/interfaces/curriculum-file';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { CurriculumHomeComponent } from "src/app/components/curriculum-home/curriculum-home.component";
import { DigitalBrandingComponent } from "../digital-branding/digital-branding.component";

import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { SchedulePipe } from 'src/app/pipes/schedule.pipe';
import { AdvisoryIttComponent } from '../advisory-itt/advisory-itt.component';
import { SecurityComponent } from "../security/security.component";
import { summaryFileName } from '@angular/compiler/src/aot/util';


defineLocale('es-CO', esLocale);
import { Router } from "@angular/router";

@Component({
  selector: 'app-scheduling-itt',
  templateUrl: './scheduling-itt.component.html',
  styleUrls: ['./scheduling-itt.component.scss']
})
export class SchedulingIttComponent implements OnInit {

  @Input() typeSchedule?: number;
  @Input() module?: string;

  count: number = 0;
  bsInlineValue = new Date();
  pipe = new DatePipe('es-CO');

  //Fechas y Formatos
  datePickerConfig: Partial<BsDatepickerConfig>;
  dateFormat = 'dd/MM/yyyy';
  hourFormat = 'HH:MM'
  locale = 'es';
  mstep = 30;

  // Form
  formContact: FormGroup;
  submitted: boolean = false;

  // Data
  schedules: any[] = [];
  typeSchedules: any[] = [];
  obj: any;
  action: string = "new";

  // 
  checked: boolean = false;
  curriculumArchivos: CurriculumFile = {};
  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';
  loader: boolean = false;
  iframe: any;

  //
  tipoAgenda: string = "";
  tipoConsultaBool: boolean;
  showConfirm: boolean = false;
  step: number = 0;
  currentDate = new Date();
  currentDate2 = new Date();
  created: boolean;
  dates: boolean;


  constructor(private localeService: BsLocaleService, public booking: BookingService, public login: LoginService,
    private curriculumService: CurriculumService
    , public ch: CurriculumHomeComponent
    , public db: DigitalBrandingComponent
    , private sanitizer: DomSanitizer
    , public sch: SchedulePipe
    , public ad: AdvisoryIttComponent
    , public se: SecurityComponent, public router: Router
  ) {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1);

    this.dates = `${this.currentDate.getFullYear()}/${this.currentDate.getMonth() + 1}/${this.currentDate.getDate()}` == `${this.currentDate2.getFullYear()}/${this.currentDate2.getMonth() + 1}/${this.currentDate2.getDate()}`;


    this.datePickerConfig = Object.assign(
      {},
      {
        containerClass: 'theme-default',
        showWeekNumbers: false,
        dateInputFormat: 'DD/MM/YYYY',
        minDate: new Date(),
        maxDate: new Date(2050, 0, 1),
        outsideClick: true,
        adaptivePosition: true
      }
    );


  }

  onDateChange(event) {
    //  console.log(event);
    this.formContact.get('fechaAgenda').setValue(event);
  }

  onTimeChange(event) {
    let elements = document.getElementsByClassName('hour selected');
    if (elements.length > 0) {
      elements[0].className = 'hour';
    }

    this.formContact.get('horaAgenda').setValue(event['target']['innerText'])
    this.showConfirm = true;
    return event['target']['className'] = 'hour selected';
  }

  get f() { return this.formContact.controls; }

  ngOnInit() {
    this.loader = true;
    this.localeService.use('es');
    this.login.isActive();
    this.booking.getSchedules(this.login.getDataUser().idUsuario).subscribe(
      res => {
        this.loader = false;
        let schedulesAux = [];
        if (res['codigo'] == 0 && res['data'] != null) {
          for (let i = 0; i < res['data'].length; i++) {
            res['data'][i]['horaAgenda'] = String(res['data'][i]['horaAgenda']).substr(0, 5);
            res['data'][i]['fechaAgenda'] = String(res['data'][i]['fechaAgenda']).substr(0, 10);
            schedulesAux.push(res['data'][i]);
          }
          this.loadTypeSchedules(schedulesAux);
        }else{
          this.count = 1;
        }
      }
    );

    this.formContact = new FormGroup({
      idAgenda: new FormControl(''),
      idAgendaTipo: new FormControl(this.typeSchedule ? this.typeSchedule : 2023),
      DiscriminadorAgendamiento: new FormControl('', Validators.compose([Validators.required])),
      idUsuario: new FormControl(this.login.getDataUser().idUsuario),
      contacto: new FormControl('', Validators.compose([Validators.required])),
      fechaAgenda: new FormControl('', Validators.compose([Validators.required])),
      horaAgenda: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  loadTypeSchedules(schedules){    
    this.loader = true;
    let modulo = this.module;
    this.module == 'HojaVida-1'? modulo = 'HojaVida':this.module;
    
    // Get schedules types
    this.booking.getScheduleTypes(modulo).subscribe(
      res => {
        // console.log('Asignando...typeSchedules');
        this.typeSchedules = res['data'];
        this.loader = false;
        
        this.schedules = this.sch.transform(schedules, this.typeSchedules);
        console.log(this.schedules);
        if (this.schedules.length == 0 && (this.module == 'Branding' || this.module == 'Seguridad')) {
          this.count = 1
        }
        console.log(this.count);
        
      }
    );
  }

  getSchedules() {
    // Get schedules
    this.booking.getSchedules(this.login.getDataUser().idUsuario).subscribe(
      res => {
        // console.log(res);
        if (res['codigo'] == 0 && res['data'] != null) {
          for (let i = 0; i < res['data'].length; i++) {
            res['data'][i]['horaAgenda'] = String(res['data'][i]['horaAgenda']).substr(0, 5);
            res['data'][i]['fechaAgenda'] = String(res['data'][i]['fechaAgenda']).substr(0, 10);

            this.schedules.push(res['data'][i]);
          }
        }
      }
    );
  }


  onsubmit() {
    this.submitted = true;
    this.loader = true;

    if (this.formContact.get('fechaAgenda').value == '') {
      Swal.fire({
        title: 'Ops!',
        text: `Debes proporcionar una fecha.`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      }).then(res => {
        this.step = 0;
      });
      this.loader = false;
      return;
    }

    let dateAux = new Date(this.formContact.get('fechaAgenda').value);
    // let date = new Date(`${dateAux.getDate()}/${dateAux.getMonth()+1}/${dateAux.getFullYear()}`);
    let date = new Date(`${dateAux.getFullYear()}/${dateAux.getMonth() + 1}/${dateAux.getDate()}`);
    // console.log(date);
    // this.pipe.transform(this.formContact.get('fechaAgenda').value, this.dateFormat)
    this.formContact.get('fechaAgenda').setValue(date);
    this.formContact.get('contacto').setValue(String(this.formContact.get('contacto').value).includes("@") ? `${this.formContact.get('contacto').value}` : `${this.formContact.get('contacto').value}`)
    // console.log(this.formContact);

    if (this.formContact.invalid) {
      Swal.fire({
        title: 'Ops!',
        text: `Debes diligenciar los campos que son obligatorios.`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.loader = false;
      return;
    } else {

      if (this.action == "new") {
        this.booking.addSchedule(this.formContact.value).subscribe(
          res => {
            // console.log(res);
            this.formContact.get('idAgenda').setValue(res['data']['idAgenda']);

            if (res['codigo'] == 0) {
              res['data']['horaAgenda'] = String(res['data']['horaAgenda']).substr(0, 5);
              res['data']['fechaAgenda'] = String(res['data']['fechaAgenda']).substr(0, 10);
              this.schedules.push(res['data']);
              Swal.fire({
                title: 'Agendado',
                text: `Se ha relizado el agendamiento exitosamente!.`,
                type: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                // Hacer redirecciones necesarias
                // if (this.module == 'Legal ITT') {
                //   this.ad.count = 0;
                // } else if (this.module == 'Seguridad') {
                //   this.se.count = 0;
                // } else if (this.module == 'branding') {
                //   this.db.clearForm();
                // }
              });
              this.booking.sendSMSEmail(res['data']['idAgenda'], 'Agendar').subscribe(
                res => {
                  // console.log(res);
                }
              );
              this.step = 2;
              this.created = true;
            }
            this.loader = false;

            // Hacemos correción de la fecha para visualizarla bein
            let dateAux = new Date(this.formContact.get('fechaAgenda').value);
            // let date = new Date(`${dateAux.getDate()}/${dateAux.getMonth()+1}/${dateAux.getFullYear()}`);
            let date = `${dateAux.getFullYear()}/${dateAux.getMonth() + 1}/${dateAux.getDate()}`;
            this.formContact.get('fechaAgenda').setValue(date);
          }
        );
      } else if (this.action == "update") {
        this.booking.updateSchedule(this.formContact.value).subscribe(
          res => {
            console.log(res);

            if (res['codigo'] == 0) {
              Swal.fire({
                title: 'Actualizado',
                text: `Se ha relizado la actulización exitosamente!.`,
                type: 'success',
                confirmButtonText: 'Aceptar'
              }).then(
                res => {
                  this.step = 2;
                }
              );
              this.booking.sendSMSEmail(res['data']['idAgenda'], 'Agendar').subscribe(
                res => {
                  // console.log(res);
                }
              )
              this.loader = false;
              this.created = true;
            }
            this.loader = false;

            // Hacemos correción de la fecha para visualizarla bein
            let dateAux = new Date(this.formContact.get('fechaAgenda').value);
            // let date = new Date(`${dateAux.getDate()}/${dateAux.getMonth()+1}/${dateAux.getFullYear()}`);
            let date = `${dateAux.getFullYear()}/${dateAux.getMonth() + 1}/${dateAux.getDate()}`;
            this.formContact.get('fechaAgenda').setValue(date);
          }
        );
        let obj = this.schedules.find(x => x.idAgenda == this.formContact.get('idAgenda').value);
        this.schedules.splice(obj, 1);
        this.schedules.push(this.formContact.value);
      }
      // this.decrement();
    }
  }

  increment() {
    window.scroll(0, 0);
    this.count++;
  }

  decrement() {
    window.scroll(0, 0);
    this.count--;
  }

  alerta(element) {
    // alert(element);
    if (element == 'whatsapp') {
      document.getElementById(element).className = 'btn1 active';
      document.getElementById('skype').className = 'btn1';
      document.getElementById('phone').className = 'btn1';
      document.getElementById('contacto').className = 'fab fa-whatsapp';
      document.getElementById('iconWa').className = 'fab fa-whatsapp whatsapp';
      document.getElementById('whatsappImg').style.display = 'none';
      this.formContact.get('DiscriminadorAgendamiento').setValue('1');
      this.formContact.get('contacto').setValidators([Validators.pattern('[0-9 ]{9,12}'), Validators.required]);
      this.formContact.get('contacto').setValue(String(this.login.getDataUser().numeroCelular).substr(2, String(this.login.getDataUser().numeroCelular).length));
    } else if (element == 'skype') {
      document.getElementById(element).className = 'btn1 active';
      document.getElementById('whatsapp').className = 'btn1';
      document.getElementById('phone').className = 'btn1';
      document.getElementById('contacto').className = 'fab fa-skype';
      document.getElementById('iconWa').className = 'fab fa-whatsapp whatsapp d-none';
      document.getElementById('whatsappImg').style.display = 'block';
      this.formContact.get('DiscriminadorAgendamiento').setValue('2');
      this.formContact.get('contacto').setValidators([Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+.[com,org,co,net,es]'), Validators.required]);
      this.formContact.get('contacto').setValue(this.login.getDataUser().correoElectronico);
    } else if (element == 'phone') {
      document.getElementById(element).className = 'btn1 active';
      document.getElementById('whatsapp').className = 'btn1';
      document.getElementById('skype').className = 'btn1';
      document.getElementById('contacto').className = 'fas fa-phone-alt';
      document.getElementById('iconWa').className = 'fab fa-whatsapp whatsapp d-none';
      document.getElementById('whatsappImg').style.display = 'block';
      this.formContact.get('DiscriminadorAgendamiento').setValue('0');
      this.formContact.get('contacto').setValidators([Validators.pattern('[0-9 ]{9,12}'), Validators.required]);
      this.formContact.get('contacto').setValue(String(this.login.getDataUser().numeroCelular).substr(2, String(this.login.getDataUser().numeroCelular).length));
    }
  }

  delete(id) {
    Swal.fire({
      title: 'Cancelación',
      text: "¿Estás seguro de cancelar este agendamiento?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) {
        this.booking.deleteSchedule(id).subscribe(
          res => {
            // console.log(res);
            if (res['codigo'] == 0) {
              Swal.fire({
                title: 'Eliminado',
                text: `Se ha eliminado el agendamiento exitosamente!.`,
                type: 'success',
                confirmButtonText: 'Aceptar'
              }).then(
                res => {
                  console.log(this.typeSchedule);

                  location.reload();
                  // // Hacer redirecciones necesarias
                  // if (this.module == 'Legal ITT') {
                  //   this.ad.count = 0;
                  // } else if (this.module == 'Seguridad') {
                  //   this.se.count = 0;
                  // } else if (this.module == 'Branding') {
                  //   this.db.clearForm();
                  // }
                }
              );
              console.log(this.schedules);
              let obj = this.schedules.find(x => x.idAgenda == id);
              this.schedules.splice(obj, 1);
              // this.step = 0;
              this.increment();
              this.clear();
            }
          }
        );
        this.clear();
      } 
    })
  }

  loadData(id) {
    Swal.fire({
      title: 'Editar',
      text: "¿Estás seguro de Editar este agendamiento?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Editar'
    }).then((result) => {
    this.action = "update";
      if (result.value) {
        this.action = "update";
        this.obj = this.schedules.find(x => x.idAgenda == id);
        // console.log(this.obj);
        let date = String(this.obj['horaAgenda']).split(':');

        this.formContact.get('idAgenda').setValue(this.obj['idAgenda']);
        this.formContact.get('DiscriminadorAgendamiento').setValue(this.obj['DiscriminadorAgendamiento']);
        this.formContact.get('contacto').setValue(this.obj['contacto']);
        this.formContact.get('fechaAgenda').setValue(this.obj['fechaAgenda']);
        this.formContact.get('horaAgenda').setValue(`${date[0]}:${date[1]}`);
        this.step = 0;
        this.count = 1;
        // this.decrement();
        // console.log(this.count);
        this.created = false;
      }
      
    })

  }

  validate() {
    // Verifica que el campo no esté vacio
    // console.log(this.tipoAgenda);

    if (this.tipoAgenda == '') {
      // console.log('debe diligenciar ese campo...');
      this.tipoConsultaBool = true;
      return;
    } else {
      this.formContact.get('idAgendaTipo').setValue(this.tipoAgenda);
    }


    // Todo bien
    this.tipoConsultaBool = false;
    // this.step = 1;
    this.increment();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log('entró al anchanges!...');

    // this.loadTypeSchedules();

    // console.log(this.show);
    // console.log(this.typeSchedule);
    // console.log(this.module);
    // console.log(this.step);


    window.scroll(0, 0);

    // if(this.obj['DiscriminadorAgendamiento']==0) {
    //   document.getElementById('phone').click();
    // } else if(this.obj['DiscriminadorAgendamiento']==1) {
    //   document.getElementById('whatsapp').click();
    // }else if(this.obj['DiscriminadorAgendamiento']==2) {
    //   document.getElementById('skype').click();
    // }
  }

  clear() {
    this.formContact.get('contacto').setValue('');
    this.formContact.get('fechaAgenda').setValue('');
    this.formContact.get('horaAgenda').setValue('');
    this.showConfirm = false;
    this.created = false;
  }


  //Cargar Archivos
  uploadFile() {
    document.getElementById("inpPhoto").click();
  }

  handleInputChange(e) {

    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /application\/pdf/;
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
    this.loaded = false;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {

    var reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc);

    this.loaded = true;

    this.curriculumArchivos.idUsuario = this.login.getDataUser().idUsuario;
    this.curriculumArchivos.imagenBase64 = this.imageSrc.split("base64,")[1];
    this.curriculumArchivos.idImagen = this.imageSrc.split("base64,")[0] + "base64,";
    this.curriculumArchivos.tipoArchivo = "hojaVida";

    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageSrc);

    // console.log(JSON.stringify(this.curriculumArchivos));

    this.curriculumService.savePhotoCurriculum(this.curriculumArchivos).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'OK',
          text: 'El achivo fue cargado!.',
          type: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.curriculumArchivos.imagenBase64 = this.imageSrc;
      },
      (error: any) => console.log(error)
    );
  }

  descargarPdf() {
    const downloadLink = document.createElement("a");
    const fileName = "CurriculumVitae.pdf";

    downloadLink.href = this.imageSrc;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  toInt(str) {
    return parseInt(str)
  }

  compareDates(date1, date2) {
    return date1 == date2;
  }

  goHome(){
    if (this.module == 'Branding') {
      this.router.navigateByUrl('/digitalbranding').then(
        res => {
          window.location.reload();
        }
      )
    }else if(this.module == 'Legal ITT'){
      this.router.navigateByUrl('/advisory-itt').then(
        res => {
          window.location.reload();
        }
      )
    }else if(this.module == 'seguridad'){
      this.router.navigateByUrl('/advisory-itt').then(
        res => {
          window.location.reload();
        }
      )
    }

  }

  goBack(){
    if (this.module == 'Legal ITT') {
      window.scroll(0, 0);
      this.count--;
    }else if(this.module == 'Branding'){
      window.scroll(0, 0);      
      this.db.pagina = 2;
    }else if(this.module == 'Seguridad'){
      window.scroll(0, 0);      
      this.count--;
    }

  }

}
