import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../services/login.service";
import { BookingService } from "../../../services/booking/booking.service";
import { PsicoService } from "../../../services/psico/psico.service";
import { TypePsico, Questions, FormAnswers, FormTets } from "../../../interfaces/psico";
import Swal from 'sweetalert2';
import { Chart } from "chart.js";
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-psico-tests',
  templateUrl: './psico-tests.component.html',
  styleUrls: ['./psico-tests.component.scss'],
  styles: [
    `
    :host {
      >>> .popover {
        background-color: #4e667a !important;
        color: #fff;
      }
   }
    :host >>> .popover>.arrow:after {
      border-top-color: #4e667a;
      color: #ffffff !important;
    }
    :host ::ng-deep .popoverr {
      border-right-color: blue;
    }
  `
  ]
})
export class PsicoTestsComponent implements OnInit {

  resultadosPartes: boolean = false;
  resultadosNumeros: boolean = false;
  resultadosRazonamiento: boolean = false;
  resultadosPercepcion: boolean = false;
  public count: number = 0;
  public pruebaCompleta: boolean = false;
  isSimulation: boolean;
  obj: TypePsico = {};
  index: number = 1;
  submitted: boolean;
  timeOut: any;
  //Resolución
  BarChart = [];
  Partes: string;
  Numeros: string;
  Razonamiento: string;
  Percepcion: string;
  Partes_buenas: string;
  Numeros_buenos: string;
  Razonamiento_buenas: string;
  Percepcion_buenos: string;
  Razonamiento_malas: string;
  Percepcion_malos: string;
  Partes_malas: string;
  Numeros_malos: string;

  // Loader
  loader: boolean;

  // Data
  dataTypePsico: TypePsico[] = [];
  dataQuestions: Questions[] = [];
  formTest: FormTets;

  // Formulario envío
  formAnswers: FormAnswers[] = [];
  idPrueba: number;
  cantidadPreguntasTotal: number;

  // User
  user: any = {};
  pruebas: any = [];

  constructor(private login: LoginService, private booking: BookingService, private psico: PsicoService, private route: ActivatedRoute) {
    this.user = this.login.getDataUser();
  }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('p') != null) {
      this.count = parseInt(this.route.snapshot.queryParamMap.get('p'));
    }

    this.verifyTest(this.user['idUsuario'], `${this.isSimulation ? 'simulacion' : 'prueba'}`);
    // $('.modalFinish').click();
  }

  public increment() {
    this.login.verifySesion();
    this.count++;
    if (this.count == 5) {
      this.submitted = false;
    } else if (this.count == 3) {
      this.timeOut = setTimeout(function () { $('.modalTime').click(); }, 300000);
    } else if (this.count != 3) {
      clearTimeout(this.timeOut);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }
  public decrement() {
    clearTimeout(this.timeOut);
    this.login.verifySesion();
    if (this.pruebaCompleta) {
      this.count--;
      this.pruebaCompleta = false;
    } else {
      this.count--;
    }
  }

  public goHome() {
    this.count = 0;
  }

  volverPruebas() {
    this.count = 1;
    this.submitted = false;
    this.pruebaCompleta = false;
  }

  assign(value) {
    this.isSimulation = value;
    this.increment();
    this.getTypePsico();
    this.verifyTest(this.user['idUsuario'], `${this.isSimulation ? 'simulacion' : 'prueba'}`);
  }

  indexInc() {
    if (this.index > this.dataQuestions.length) {
      this.index = 1;
    }
    return this.index++;
  }

  getTypePsico() {
    this.loader = true;
    this.psico.getTypePsico().subscribe(
      (res: any) => {
        // console.log(res);
        this.dataTypePsico = res;
        // console.log(this.dataTypePsico);
        this.loader = false;
      }
    )
  }

  getQuestionsComplete(id) {
    this.psico.getQuestionsComplete(id).subscribe(
      res => {
        // console.log(res);
        this.dataQuestions = res['data'];
        // console.log(this.dataQuestions);
        this.selected(id);
        this.addTest();
        this.increment();
      }
    )
  }

  getQuestionsSimulation(id) {
    this.psico.getQuestionsSimulation(id).subscribe(
      res => {
        //console.log(res);
        this.dataQuestions = res['data'];
        //console.log(this.dataQuestions);
        this.selected(id);
        this.addTest();
        this.increment();
      }
    )
  }

  addTest() {
    let form: FormTets = {
      idUsuario: this.login.getDataUser()['idUsuario'],
      idTipoPregunta: this.obj.idTipoPregunta,
      esSimulacion: this.isSimulation
    };

    this.psico.addTest(form).subscribe(
      res => {
        // console.log(res);
        if (res['codigo'] == 0) {
          this.idPrueba = res['data']['idPrueba']
        }
      }
    )
  }

  addAnswerTets(form) {
    this.psico.addAnswerTets(form).subscribe(
      res => {
        // console.log(res);
        // Registrar que la prueba finalizó
        this.psico.finishTest(res['data']['idPrueba']);
      }
    )

    this.verifyTest(this.user['idUsuario'], `${this.isSimulation ? 'simulacion' : 'prueba'}`);
  }

  verifyTest(id, typeTest) {
    this.psico.verifyTest(id, typeTest).subscribe(
      res => {
        // console.log(res);        
        this.pruebas[0] = res['data'][0]['completado'];
        this.pruebas[1] = res['data'][1]['completado'];
        this.pruebas[2] = res['data'][2]['completado'];
        this.pruebas[3] = res['data'][3]['completado'];
        // console.log(this.pruebas);
      }
    )
  }

  selected(id) {
    this.dataTypePsico.forEach(data => {
      if (data.idTipoPregunta == id) {
        this.obj = data;
      }
    });
  }

  saveData() {
    this.formAnswers = [];
    let ps = document.getElementsByClassName("grupoPregunta");
    let todasRespondidas: boolean = true;
    for (var i = 0; i < ps.length; i++) {
      let radioRespondido: boolean = false;
      let psr = document.getElementsByName("radio-" + ps[i].id.split('-')[1]);
      for (var j = 0; j < psr.length; j++) {
        if (psr[j]['checked'] == true) {
          radioRespondido = true;
          // console.log(ps[i].id.split('-')[1]);
          // console.log(psr[j].id.split('-')[1]);
          let form: FormAnswers = {
            idPrueba: this.idPrueba,
            idPregunta: parseInt(ps[i].id.split('-')[1]),
            idPreguntaRespuesta: parseInt(psr[j].id.split('-')[1])
          }
          this.formAnswers.push(form);
        }
      }
      if (radioRespondido == false) {
        todasRespondidas = false;
      }
    }
    if (todasRespondidas) {
      this.formAnswers.forEach(element => {
        this.addAnswerTets(element);
        clearTimeout(this.timeOut);
        Swal.fire({
          title: 'Haz finalizado la prueba con éxito',
          text: 'Puedes continuar realizando las demás pruebas, para indentificar tus habilidades y aptitudes',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          // this.increment();

          //
          this.submitted = true;

          for (var i = 0; i < ps.length; i++) {
            let radioRespondido: boolean = false;
            let psr = document.getElementsByName("radio-" + ps[i].id.split('-')[1]);
            let idPreguntaRespuestaCorrectaJSON: number = 0;
            for (var j = 0; j < psr.length; j++) {
              if (psr[j]['checked'] == true) {
                radioRespondido = true;
                // console.log(ps[i].id.split('-')[1]);
                // console.log(psr[j].id.split('-')[1]);
                let form: FormAnswers = {

                  idPrueba: this.idPrueba,
                  idPregunta: parseInt(ps[i].id.split('-')[1]),
                  idPreguntaRespuesta: parseInt(psr[j].id.split('-')[1])
                }
                // if(this.obj.idTipoPregunta == 1){
                //   document.getElementById("lbl-"+form.idPreguntaRespuesta).className = "form-check-label labelGrayNumber iconPartTest rtaOKRed"
                //   document.getElementById("dvCheckRta-"+form.idPreguntaRespuesta).className = "checkPositionError"
                //   document.getElementById("dvCheckRta-"+form.idPreguntaRespuesta).innerHTML = "<i class='fas fa-times-circle'></i>"
                //   idPreguntaRespuestaCorrectaJSON = this.dataQuestions.filter(x => x.IdPregunta==form.idPregunta)[0].Data.filter(y => y.esCorrecta==true)[0].idPreguntaRespuesta;
                //   // console.log("lbl-"+idPreguntaRespuestaCorrectaJSON);
                //   document.getElementById("lbl-"+idPreguntaRespuestaCorrectaJSON).className = "form-check-label labelGrayNumber iconPartTest rtaOKGreen"
                //   document.getElementById("dvCheckRta-"+idPreguntaRespuestaCorrectaJSON).className = "checkPositionOK"
                //   document.getElementById("dvCheckRta-"+idPreguntaRespuestaCorrectaJSON).innerHTML = "<i class='fas fa-check-circle'></i>"
                // }
                // if(this.obj.idTipoPregunta == 2){
                //   // console.log("lbl-"+form.idPreguntaRespuesta);
                //   document.getElementById("lbl-"+form.idPreguntaRespuesta).className = "form-check-label labelGrayNumber2 activeRTAError"
                //   document.getElementById("dvCheckRta-"+form.idPreguntaRespuesta).className = "checkPositionError"
                //   document.getElementById("dvCheckRta-"+form.idPreguntaRespuesta).innerHTML = "<i class='fas fa-times-circle'></i>"
                //   idPreguntaRespuestaCorrectaJSON = this.dataQuestions.filter(x => x.IdPregunta==form.idPregunta)[0].Data.filter(y => y.esCorrecta==true)[0].idPreguntaRespuesta;
                //   // console.log("lbl-"+idPreguntaRespuestaCorrectaJSON);
                //   document.getElementById("lbl-"+idPreguntaRespuestaCorrectaJSON).className = "form-check-label labelGrayNumber2 activeRTA"
                //   document.getElementById("dvCheckRta-"+idPreguntaRespuestaCorrectaJSON).className = "checkPositionOK"
                //   document.getElementById("dvCheckRta-"+idPreguntaRespuestaCorrectaJSON).innerHTML = "<i class='fas fa-check-circle'></i>"
                // }
                // this.formAnswers.push(form);
              }
            }
            if (radioRespondido == false) {
              todasRespondidas = false;
            } else {
              if (this.obj.idTipoPregunta == 1 || this.obj.idTipoPregunta == 2 || this.obj.idTipoPregunta == 5 || this.obj.idTipoPregunta == 6) {
                // let rdPartes = document.getElementsByClassName("radioPartes");
                // for(let i=0;i<rdPartes.length;i++){
                //   rdPartes[i]["style"].display = "none";
                // }
                this.count = 4;
              }
            }
          }
          //
          if (this.obj.idTipoPregunta == 3) { this.increment() }
          if (this.obj.idTipoPregunta == 4) { this.increment() }
        });
      });
    } else {
      this.submitted = false;
      this.formAnswers = [];
      Swal.fire({
        title: 'Campos incompletos',
        text: `Por favor diligencia todos los campos para continuar.`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  }
  cargarDatosResolucion() {
    this.pruebaCompleta = true;
    window.scroll(0, 0);
    this.psico.getPsicoReports(this.login.getDataUser()['idUsuario']).subscribe(
      res => {
        let optDona = {
          layout: { padding: { top: 25, }, },
          tooltips: {
            enabled: true,
            backgroundColor: "#ffffff",
            bodyFontColor: 'black',
            titleFontColor: '#ffffff',
            displayColors: false,
            xPadding: 20,
            yPadding: 20,
            borderColor: 'rgba(0, 0, 0, 0.22)',
            borderWidth: 2
          }, plugins: {
            datalabels: {
              display: true,
              color: '#e2c3f7',
              font: {
                style: ' bold',
              },
            },
          },
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
            }
          },
        }
        var valores = [];
        var textos = [];
        if (res[0].json1 != "") {
          var jsonLider: any[] = JSON.parse(res[0].json1);
          for (let i = 0; i < jsonLider.length; i++) {
            valores.push(jsonLider[i].valor)
            textos.push(jsonLider[i].tipoInfluencia)
          }
          var bar_ctx = (<HTMLCanvasElement>document.getElementById('barChart')).getContext('2d');

          var purple_orange_gradient = bar_ctx.createLinearGradient(0, 0, 0, 600);
          purple_orange_gradient.addColorStop(0, '#6f29c8');
          purple_orange_gradient.addColorStop(1, '#790770');

          let myBarChart = new Chart(bar_ctx, {
            type: 'bar',
            data: {
              labels: textos,
              datasets: [{
                data: valores,
                backgroundColor: purple_orange_gradient,
                hoverBackgroundColor: purple_orange_gradient,
                borderColor: "gray",
                borderWidth: 0

              }
              ],
            },
            position: "top",
            options: {
              layout: { padding: { top: 50, left: 12, }, },
              legend: {
                display: false
              },
              tooltips: {
                enabled: true,
                backgroundColor: "#ffffff",
                bodyFontColor: 'black',
                titleFontColor: 'black',
                displayColors: false,
                xPadding: 20,
                yPadding: 20,
                borderColor: 'rgba(0, 0, 0, 0.22)',
                borderWidth: 2
              },
              scales: {
                xAxes: [{
                  categoryPercentage: 0.2,
                  gridLines: { display: false },
                }],

              },
            }
          });
        }
        if (res[0].json3 != "") {
          var jsonAgilidad = JSON.parse(res[0].json3);
          this.Partes = jsonAgilidad[0].texto;
          this.Partes_buenas = jsonAgilidad[0].buenas;
          this.Partes_malas = jsonAgilidad[0].malas;
          this.Numeros = jsonAgilidad[1].texto;
          this.Numeros_buenos = jsonAgilidad[1].buenas;
          this.Numeros_malos = jsonAgilidad[1].malas;
          this.Razonamiento = jsonAgilidad[2].texto;
          this.Razonamiento_buenas = jsonAgilidad[2].buenas;
          this.Razonamiento_malas = jsonAgilidad[2].malas;
          this.Percepcion = jsonAgilidad[3].texto;
          this.Percepcion_buenos = jsonAgilidad[3].buenas;
          this.Percepcion_malos = jsonAgilidad[3].malas;
        }
        if (res[0].json2 != "") {
          var jsonPersonalidad = JSON.parse(res[0].json2);
          new Chart(document.getElementById("pieChart1"), {
            type: 'doughnut',
            data: {
              labels: [jsonPersonalidad[0].glosa, jsonPersonalidad[1].glosa],
              datasets: [{
                data: [jsonPersonalidad[0].cantidad, jsonPersonalidad[1].cantidad],
                backgroundColor: ["#5630af", "#e6d3fe"],
                borderWidth: 1,
              }
              ],
            },
            options: optDona,
          });
          new Chart(document.getElementById("pieChart2"), {
            type: 'doughnut',
            data: {
              labels: [jsonPersonalidad[2].glosa, jsonPersonalidad[3].glosa],
              datasets: [{
                data: [jsonPersonalidad[2].cantidad, jsonPersonalidad[3].cantidad],
                backgroundColor: ["#5630af", "#e6d3fe"],
                borderWidth: 1
              }
              ],
            },
            options: optDona,
          });
          new Chart(document.getElementById("pieChart3"), {
            type: 'doughnut',
            data: {
              labels: [jsonPersonalidad[4].glosa, jsonPersonalidad[5].glosa],
              datasets: [{
                data: [jsonPersonalidad[4].cantidad, jsonPersonalidad[5].cantidad],
                backgroundColor: ["#5630af", "#e6d3fe"],
                borderWidth: 1
              }
              ],

            },
            options: optDona,
          });
          new Chart(document.getElementById("pieChart4"), {
            type: 'doughnut',
            data: {
              labels: [jsonPersonalidad[6].glosa, jsonPersonalidad[7].glosa],
              datasets: [{
                data: [jsonPersonalidad[6].cantidad, jsonPersonalidad[7].cantidad],
                backgroundColor: ["#5630af", "#e6d3fe"],
                borderWidth: 1
              }
              ],
            },
            options: optDona,
          });
        }
      })
  }

  changeRadio(event) {
    if (event.target.name == 'question1' && event.target.value == 3) {
      console.log('repuesta correcta');
      $('.modalSuccess').click();
    } else if (event.target.name == 'question2' && event.target.value == 1) {
      $('.modalSuccess').click();
      console.log('repuesta correcta');
    } else {
      console.log('repuesta IIncorrecta');
      $('.modalError').click();
    }
  }

  changeRadio2(event) {
    if (event.target.name == 'question1' && event.target.value == 2) {
      console.log('repuesta correcta');
      $('.modalSuccess').click();
    } else if (event.target.name == 'question2' && event.target.value == 4) {
      $('.modalSuccess').click();
      console.log('repuesta correcta');
    } else {
      console.log('repuesta IIncorrecta');
      $('.modalError').click();
    }
  }

  mostrarPartes() {
    this.resultadosPartes = !this.resultadosPartes;
  }
  mostrarNumeros() {
    this.resultadosNumeros = !this.resultadosNumeros;
  }
  mostrarRazonamiento() {
    this.resultadosRazonamiento = !this.resultadosRazonamiento;
  }
  mostrarPercepcion() {
    this.resultadosPercepcion = !this.resultadosPercepcion;
  }

}
