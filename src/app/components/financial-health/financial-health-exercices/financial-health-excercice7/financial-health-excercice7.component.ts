import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../../services/login.service";
import { SaludfinService } from 'src/app/services/salud-fin.service';
import { Saludfin, SaludIndicador } from 'src/app/interfaces/saludfin';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-financial-health-excercice7',
  templateUrl: './financial-health-excercice7.component.html',
  styleUrls: ['./financial-health-excercice7.component.scss']
})
export class FinancialHealthExcercice7Component implements OnInit {

  constructor(public login: LoginService, public sf: SaludfinService,  private route: ActivatedRoute) { }
  pagina: number;
  section: number = 1;
  subSection: number = 1;
  indicadores: SaludIndicador[] = [];
  totalIndicadores: number = 0;
  todosTerminados: boolean = false;
  totalResolucion: string;

  respuestas1: any = {
  }

  s5s2p5: string = "";
  s5s2p4: string = "";
  s5s2p2: string = "";
  s8s1p4: string = "";
  s8s1p1: string = "";
  s10s1p4: string = "";
  s9s1p3: string = "";
  s9s1p4: string = "";
  s9s1p5: string = "";
  s9s1p6: string = "";
  s9s1p7: string = "";
  s9s1p8: string = "";

  respuestas2: any = {

  }

  respuestas3: any = {
    "campo_1_1": "",
    "campo_1_2": "",
    "campo_1_3": "",
    "campo_1_4": "",
    "campo_1_5": ""
  };
  respuestas6: any = {
    "campo_7_1": "",
    "campo_7_2": ""
  }
  respuestas8: any = {
    "campo_2_1": "",
    "campo_2_2": "",
    "campo_2_3": "",
    "campo_2_4": "",
    "campo_2_5": "",
    "campo_2_6": "",
    "campo_2_7": "",
    "campo_2_8": "",
    "campo_2_9": "",
    "campo_2_10": "",
    "campo_2_11": "",
    "campo_2_12": "",
    "campo_2_13": "",
    "campo_2_14": "",
    "campo_2_15": "",
    "campo_2_16": "",
    "campo_2_17": "",
    "campo_2_18": "",
    "campo_2_19": "",
    "campo_2_20": "",
    "campo_2_21": "",
    "campo_2_22": ""
  }

  respuestas9: any = {

  }

  respuestas10: any = {
    "campo_10_1": ""
  }
  respuestas4: any = {}
  respuestas7: any = {}


  entSf: Saludfin = {};
  formDeuda: boolean = false;
  formMuerte: number = 0;
  ngOnInit() {
    window.scroll(0, 0);
    this.pagina = 0;


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


    this.loadIndicators();
  }

  loadIndicators() {
    this.sf.getFinantialHealt(this.login.getDataUser().idUsuario).subscribe(
      (data: any) => {
        this.totalIndicadores = 0;
        this.indicadores = data.data;
        console.log(this.indicadores);
        this.todosTerminados = true;
        for (let i = 0; i <= this.indicadores.length - 1; i++) {
          if (this.indicadores[i].resolucionUsuario == "") {
            this.todosTerminados = false;
          }
          this.totalIndicadores = Math.round(this.totalIndicadores + (parseFloat(this.indicadores[i].ponderacion.toString().replace(",", ".")) * this.indicadores[i].ponderacionTotal));
        }
        if (this.totalIndicadores >= 0 && this.totalIndicadores <= 20) {
          this.totalResolucion = "¡SOS, alerta roja! estas al borde de una gran crisis, podría decirse que eres “la crónica de una muerte anunciada”, pues en todos los frentes te encuentras altamente expuesto, NO ahorras, NO haces un presupuesto,, estas SOBRE endeudado, vives por encima de tus ingresos y estas a la merced de la sociedad de consumo y las presiones de la vida gobiernan sobre tus finanzas.";
        };
        if (this.totalIndicadores >= 21 && this.totalIndicadores <= 50) {
          this.totalResolucion = "Tu panorama financiero es preocupante y requiere inmediata atención. No estas ahorrando adecuadamente exponiéndote a que imprevistos, antojos y caprichos te lleven a gastar por encima de tus ingresos e incurrir en deudas innecesarias e improductivas. Tu dinero es como el viento, viene y va sin darte cuenta, síntoma típico de quien no hace y sigue un presupuesto. Al no contar con una buena cobertura de seguros una enfermedad grave, accidente o inclusive la muerte podría dejarte gravemente expuesto a ti y/o tu familia. Si sigues así no estarás preparado para afrontar la vejez de manera digna.";
        };
        if (this.totalIndicadores >= 51 && this.totalIndicadores <= 75) {
          this.totalResolucion = "Tu desempeño es REGULAR, pues aun tienes grandes debilidades. En temas del ahorro es importante redoblar esfuerzos para tener reservas que te permitan afrontar imprevistos y comprar artículos significativos sin deuda. Se recomienda de manera prioritaria desarrollar el hábito de hacer y seguir un presupuesto mensual. Al no contar con una buena cobertura de seguros una enfermedad grave, accidente o inclusive la muerte podría dejarte gravemente expuesto a ti y/o tu familia. Revisar y reforzar tu plan de jubilación. Hacer conciencia sobre ciertas actitudes y comportamiento hacia las compras que ponen en riesgo tu salud financiera.";
        };
        if (this.totalIndicadores >= 76 && this.totalIndicadores <= 100) {
          this.totalResolucion = "No es común encontrar personas con BUENOS puntajes ¡Felicitaciones! Aún tienes varios aspectos en donde puedes mejorar: (1) Respaldo de tus seguros de vida, enfermedades graves y accidentes aumentando la cobertura. (2) Tu plan de jubilación redoblando esfuerzos en el ahorro y estrategias de inversión. (3) Actitudes hacia las compras en donde aún tienes comportamientos imprudentes e impulsivos. (4) Aprovechar las bendiciones del dar y ayudar a otros.";
        };
      }
    );
  }

  startNotification() {
    this.pagina = 2;
    this.section = 1;
    window.scroll(0, 0);
  }
  endNotification() {
    this.pagina = 2;
  }
  guardarIndicador3() {
    this.entSf.idIndicador = 3;
    this.entSf.idUsuario = this.login.getDataUser().idUsuario;
    this.entSf.jsonRespuesta = JSON.stringify(this.respuestas3);
    console.log(this.entSf.jsonRespuesta);
    this.sf.saveFinantialHealt(this.entSf).subscribe(
      (data: any) => { //start of (1)
        if (data.data == "OK") {
          Swal.fire({
            title: 'Completado',
            text: 'Se han enviado tus respuestas.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.loadIndicators();
            this.setSection(1);
          });
        } else {

          Swal.fire({
            title: 'Error',
            text: 'Algo salió mal durante el envío.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
          });
        }
      }, //end of (1)
      (error: any) => console.log(error)
    );
  }
  guardarIndicador8() {
    this.respuestas8 = {
      "campo2_1": $('input[name=s2s1p1]:checked').val(),
      "campo2_2": $('input[name=s2s1p2]:checked').val(),
      "campo2_3": $('input[name=s2s1p3]:checked').val(),
      "campo2_4": $('input[name=s2s1p4]:checked').val(),
      "campo2_5": $('input[name=s2s1p5]:checked').val(),
      "campo2_6": $('input[name=s2s1p6]:checked').val(),
      "campo2_7": $('input[name=s2s1p7]:checked').val(),
      "campo2_8": $('input[name=s2s1p8]:checked').val(),
      "campo2_9": $('input[name=s2s1p9]:checked').val(),
      "campo2_10": $('input[name=s2s1p10]:checked').val(),
      "campo2_11": $('input[name=s2s1p11]:checked').val(),
      "campo2_12": $('input[name=s2s2p1]:checked').val(),
      "campo2_13": $('input[name=s2s2p2]:checked').val(),
      "campo2_14": $('input[name=s2s2p3]:checked').val(),
      "campo2_15": $('input[name=s2s2p4]:checked').val(),
      "campo2_16": $('input[name=s2s2p5]:checked').val(),
      "campo2_17": $('input[name=s2s2p6]:checked').val(),
      "campo2_18": $('input[name=s2s2p7]:checked').val(),
      "campo2_19": $('input[name=s2s2p8]:checked').val(),
      "campo2_20": $('input[name=s2s2p9]:checked').val(),
      "campo2_21": $('input[name=s2s2p10]:checked').val()
    }
    this.entSf.idIndicador = 8;
    this.entSf.idUsuario = this.login.getDataUser().idUsuario;
    this.entSf.jsonRespuesta = JSON.stringify(this.respuestas8);
    console.log(this.respuestas8);
    console.log(this.entSf);
    this.sf.saveFinantialHealt(this.entSf).subscribe(
      (data: any) => { //start of (1)
        if (data.data == "OK") {
          Swal.fire({
            title: 'Completado',
            text: 'Se han enviado tus respuestas.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.loadIndicators();
            this.setSection(1);
          });
        } else {

          Swal.fire({
            title: 'Error',
            text: 'Algo salió mal durante el envío.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
          });
        }
      }, //end of (1)
      (error: any) => console.log(error)
    );
  }
  setSection(id) {
    this.section = id;
    this.subSection = 1;
    window.scroll(0, 0);
  }

  guardarIndicador5() {
    var r = "";
    $('input.s4s2p2:checkbox:checked').each(function () {
      r = r + $(this).val() + ',';
    });

    this.respuestas1 = {
      "campo_4_1": $('input[name=s4s1p1]:checked').val(),
      "campo_4_2": r
    }

    this.entSf.idIndicador = 5;
    this.entSf.idUsuario = this.login.getDataUser().idUsuario;
    this.entSf.jsonRespuesta = JSON.stringify(this.respuestas1);
    this.sf.saveFinantialHealt(this.entSf).subscribe(
      (data: any) => { //start of (1)
        if (data.data == "OK") {
          Swal.fire({
            title: 'Completado',
            text: 'Se han enviado tus respuestas.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.loadIndicators();
            this.setSection(1);
          });
        } else {

          Swal.fire({
            title: 'Error',
            text: 'Algo salió mal durante el envío.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
          });
        }
      }, //end of (1)
      (error: any) => console.log(error)
    );
  }
  guardarIndicador2() {
    var r = "";
    $('input.s5s2p3:checkbox:checked').each(function () {
      r = r + $(this).val() + ',';
    });
    this.respuestas2 = {
      "campo_5_1": $('input[name=s5s1p1]:checked').val(),
      "campo_5_2": this.s5s2p2,
      "campo_5_3": r,
      "campo_5_4": this.s5s2p4,
      "campo_5_5": this.s5s2p5,
      "campo_5_6": $('input[name=s5s3p6]:checked').val()
    }
    this.entSf.idIndicador = 2;
    this.entSf.idUsuario = this.login.getDataUser().idUsuario;
    this.entSf.jsonRespuesta = JSON.stringify(this.respuestas2);
    this.sf.saveFinantialHealt(this.entSf).subscribe(
      (data: any) => { //start of (1)
        if (data.data == "OK") {
          Swal.fire({
            title: 'Completado',
            text: 'Se han enviado tus respuestas.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.loadIndicators();
            this.setSection(1);
          });
        } else {

          Swal.fire({
            title: 'Error',
            text: 'Algo salió mal durante el envío.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
          });
        }
      }, //end of (1)
      (error: any) => console.log(error)
    );
  }
  guardarIndicador6() {
    this.respuestas6 = {
      "campo_7_1": $('input[name=s7s1p1]:checked').val(),
      "campo_7_2": $('input[name=s7s1p2]:checked').val()
    }
    this.entSf.idIndicador = 6;
    this.entSf.idUsuario = this.login.getDataUser().idUsuario;
    this.entSf.jsonRespuesta = JSON.stringify(this.respuestas6);
    this.sf.saveFinantialHealt(this.entSf).subscribe(
      (data: any) => { //start of (1)
        if (data.data == "OK") {
          Swal.fire({
            title: 'Completado',
            text: 'Se han enviado tus respuestas.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.loadIndicators();
            this.setSection(1);
          });
        } else {

          Swal.fire({
            title: 'Error',
            text: 'Algo salió mal durante el envío.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
          });
        }
      }, //end of (1)
      (error: any) => console.log(error)
    );
  }
  guardarIndicadores10() {

    this.respuestas6 = {
      "campo_10_1": $('input[name=s10s1p1]:checked').val()
    }
    this.entSf.idIndicador = 10;
    this.entSf.idUsuario = this.login.getDataUser().idUsuario;
    this.entSf.jsonRespuesta = JSON.stringify(this.respuestas6);
    this.sf.saveFinantialHealt(this.entSf).subscribe(
      (data: any) => { //start of (1)
        if (data.data == "OK") {
          Swal.fire({
            title: 'Completado',
            text: 'Se han enviado tus respuestas.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.loadIndicators();
            this.setSection(1);
          });
        } else {

          Swal.fire({
            title: 'Error',
            text: 'Algo salió mal durante el envío.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
          });
        }
      }, //end of (1)
      (error: any) => console.log(error)
    );
  }
  guardarIndicadores1() {

    this.respuestas1 = {
      "campo_1_1": this.s8s1p1,
      "campo_1_2": $('input[name=s8s1p2]:checked').val(),
      "campo_1_3": $('input[name=s8s1p3]:checked').val(),
      "campo_1_4": this.s8s1p4,
      "campo_1_5": $('input[name=s8s1p5]:checked').val(),
      "campo_1_6": $('input[name=s8s1p6t1]:checked').val(),
      "campo_1_7": $('input[name=s8s1p6t2]:checked').val(),
      "campo_1_8": $('input[name=s8s1p6t3]:checked').val(),
    }

    this.entSf.idIndicador = 1;
    this.entSf.idUsuario = this.login.getDataUser().idUsuario;
    this.entSf.jsonRespuesta = JSON.stringify(this.respuestas1);
    this.sf.saveFinantialHealt(this.entSf).subscribe(
      (data: any) => { //start of (1)
        if (data.data == "OK") {
          Swal.fire({
            title: 'Completado',
            text: 'Se han enviado tus respuestas.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.loadIndicators();
            this.setSection(1);
          });
        } else {

          Swal.fire({
            title: 'Error',
            text: 'Algo salió mal durante el envío.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
          });
        }
      }, //end of (1)
      (error: any) => console.log(error)
    );
  }
  guardarIndicadores9() {
    this.respuestas9 = {
      "campo_9_1": $('input[name=s10s1p1t1]:checked').val(),
      "campo_9_2": $('input[name=s10s1p1t2]:checked').val(),
      "campo_9_3": $('input[name=s10s1p1t3]:checked').val(),
      "campo_9_4": $('input[name=s10s1p1t4]:checked').val(),
      "campo_9_5": $('input[name=s10s1p2t1]:checked').val(),
      "campo_9_6": $('input[name=s10s1p2t2]:checked').val(),
      "campo_9_7": $('input[name=s10s1p2t3]:checked').val(),
      "campo_9_8": $('input[name=s10s1p2t4]:checked').val(),
      "campo_9_9": $('input[name=s10s1p2t5]:checked').val(),
      "campo_9_10": $('input[name=s10s1p2t6]:checked').val(),
      "campo_9_11": $('input[name=s10s1p2t7]:checked').val(),
      "campo_9_12": $('input[name=s10s1p2t8]:checked').val(),
      "campo_9_13": $('input[name=s10s1p2t9]:checked').val(),
      "campo_9_14": $('input[name=s10s1p2t10]:checked').val(),
      "campo_9_15": $('input[name=s10s1p2t11]:checked').val(),
      "campo_9_16": $('input[name=s10s1p2t12]:checked').val(),
      "campo_9_17": $('input[name=s10s1p2t13]:checked').val(),
      "campo_9_18": $('input[name=s10s1p2t14]:checked').val(),
      "campo_9_19": $('input[name=s10s1p2t15]:checked').val(),
      "campo_9_20": $('input[name=s10s1p2t16]:checked').val(),
      "campo_9_21": $('input[name=s10s1p2t17]:checked').val(),
      "campo_9_22": $('input[name=s10s1p3]:checked').val(),
      "campo_9_23": this.s10s1p4,
      "campo_9_24": $('input[name=s10s1p5t1]:checked').val(),
      "campo_9_25": $('input[name=s10s1p5t2]:checked').val(),
      "campo_9_26": $('input[name=s10s1p5t3]:checked').val(),
      "campo_9_27": $('input[name=s10s1p5t4]:checked').val(),
      "campo_9_28": $('input[name=s10s1p5t5]:checked').val(),
      "campo_9_29": $('input[name=s10s1p5t6]:checked').val(),
      "campo_9_30": $('input[name=s10s1p5t7]:checked').val(),
      "campo_9_31": $('input[name=s10s1p5t8]:checked').val()
    }
    this.entSf.idIndicador = 9;
    this.entSf.idUsuario = this.login.getDataUser().idUsuario;
    this.entSf.jsonRespuesta = JSON.stringify(this.respuestas9);
    console.log(JSON.stringify(this.respuestas9));
    this.sf.saveFinantialHealt(this.entSf).subscribe(
      (data: any) => { //start of (1)
        if (data.data == "OK") {
          Swal.fire({
            title: 'Completado',
            text: 'Se han enviado tus respuestas.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.loadIndicators();
            this.setSection(1);
          });
        } else {

          Swal.fire({
            title: 'Error',
            text: 'Algo salió mal durante el envío.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
          });
        }
      }, //end of (1)
      (error: any) => console.log(error)
    );
  }
  guardarIndicadores4() {
    var r = "";
    $('input.s9s1p2:checkbox:checked').each(function () {
      r = r + $(this).val() + ',';
    });
    this.respuestas4 = {
      "campo_9_1": $('input[name=s9s1p1]:checked').val(),
      "campo_9_2": r,
      "campo_9_3": this.s9s1p3,
      "campo_9_4": this.s9s1p4,
      "campo_9_5": this.s9s1p5,
      "campo_9_6": this.s9s1p6,
      "campo_9_7": this.s9s1p7,
      "campo_9_8": this.s9s1p8,
    }

    this.entSf.idIndicador = 4;
    this.entSf.idUsuario = this.login.getDataUser().idUsuario;
    this.entSf.jsonRespuesta = JSON.stringify(this.respuestas4);
    this.sf.saveFinantialHealt(this.entSf).subscribe(
      (data: any) => { //start of (1)
        if (data.data == "OK") {
          Swal.fire({
            title: 'Completado',
            text: 'Se han enviado tus respuestas.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.loadIndicators();
            this.setSection(1);
          });
        } else {

          Swal.fire({
            title: 'Error',
            text: 'Algo salió mal durante el envío.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
          });
        }
      }, //end of (1)
      (error: any) => console.log(error)
    );
  }
  guardarIndicador7() {
    this.respuestas7 = {
      "campo_6_1": $('input[name=s6s1p1]:checked').val(),
      "campo_6_2": $('input[name=s6s1p2]:checked').val(),
      "campo_6_3": $('input[name=s6s1p3]:checked').val(),
      "campo_6_4": $('input[name=s6s1p4]:checked').val(),
      "campo_6_5": $('input[name=s6s1p5]:checked').val(),
    }

    this.entSf.idIndicador = 7;
    this.entSf.idUsuario = this.login.getDataUser().idUsuario;
    this.entSf.jsonRespuesta = JSON.stringify(this.respuestas7);
    this.sf.saveFinantialHealt(this.entSf).subscribe(
      (data: any) => { //start of (1)
        if (data.data == "OK") {
          Swal.fire({
            title: 'Completado',
            text: 'Se han enviado tus respuestas.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.loadIndicators();
            this.setSection(1);
          });
        } else {

          Swal.fire({
            title: 'Error',
            text: 'Algo salió mal durante el envío.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
          });
        }
      }, //end of (1)
      (error: any) => console.log(error)
    );
  }
  irServicio() {
    this.pagina = 1; window.scroll(0, 0)
  }
}
