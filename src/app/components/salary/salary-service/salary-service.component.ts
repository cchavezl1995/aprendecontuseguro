import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { SalarioService } from "../../../services/salario.service";
import { Area, Grafico1, Grafico2, Grafico3 } from "../../../interfaces/salario";
import { NivelJerarquico } from "../../../interfaces/salario";
import { Cargo } from "../../../interfaces/salario";
import { Region } from "../../../interfaces/salario";
import { TamanoEmpresa } from "../../../interfaces/salario";
import { FormBuilder, FormGroup, Validators, FormControl, FormControlDirective} from '@angular/forms';
import Swal from 'sweetalert2';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

import { Chart } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoginService } from "../../../services/login.service";
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LogsService } from 'src/app/services/logs/logs.service';

@Component({
  selector: 'app-salary-service',
  templateUrl: './salary-service.component.html',
  styleUrls: ['./salary-service.component.scss']
})
export class SalaryServiceComponent implements OnInit {
  public count: number = 0;
  areas: Area[];
  niveles: NivelJerarquico[];
  cargos  : Cargo[];
  regiones: Region[];
  tamanos: TamanoEmpresa[];
  calculadora:boolean = false;
  areaValue: string;
  nivelValue: string;
  cargoValue: string;
  tamanoValue: string;
  ciudadValue: string;
  amount: any;
  formValidation: FormGroup;

  BarChart: Chart;

  cargaSalario: number;

  multi: any[];

  view: any[] = [700, 400];

  salario:string;

  grafico1:Grafico1 = {};
  grafico3:Grafico3[] = [];
  grafico2:Grafico2[] = [];
  grafico3total:Grafico3[] = [];
  grafico2total:Grafico2[] = [];

  cboFiltro: any;
  filtro: string = 'Promedio';

  submitted:boolean = false;

  //loader
  loader:boolean = false;

  constructor(private salarioService: SalarioService, private cd: ChangeDetectorRef, public login: LoginService,private route: ActivatedRoute, private log:LogsService) { }

  AddLog(pagina: string, control: string, extra?: string){
    if(this.login.isActive()){
      this.log.addLog(pagina,control,extra);
    }
  }

  ngOnInit() { 
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
    
    this.cargaSalario = 0;
    this.getArea();
    
    this.formValidation = new FormGroup({
      // Validators.pattern('[a-zA-Z]')
      salary: new FormControl('', Validators.compose( [Validators.required])),
      cmbSector:new FormControl('', Validators.compose( [Validators.required])),
      cmbLevel:new FormControl('', Validators.compose( [Validators.required])),
      cmbCargo: new FormControl('', Validators.compose( [Validators.required])),
      cmbTamano: new FormControl('', Validators.compose( [Validators.required])),
      cmbCiudad: new FormControl('', Validators.compose( [Validators.required])) 
    });
    window.scroll(0,0);
    if(this.route.snapshot.queryParamMap.get('p')!=null){
      this.onNavigate();    
    }
    
  }

  transformAmount(event) {
    this.amount = String(event).replace(/\D/g, "");
    this.amount = Number(this.amount).toLocaleString()
  }
  
  get f() { return this.formValidation.controls; }

  ngAfterViewInit() {
    this.cd.detectChanges();
}

focusText(){
  this.cd.detectChanges();
  document.getElementById('salario').focus();
}

onSubmit() {
  this.loader = true;
  this.login.verifySesion();
  this.submitted = true;
  if (this.BarChart) this.BarChart.destroy(); 

  // stop here if form is invalid
  if (this.formValidation.invalid) {
    Swal.fire({
      title: 'Ops!',
      text: `Debes diligenciar los campos que son obligatorios.`,
      type: 'error',
      confirmButtonText: 'Aceptar'
    });
    this.loader = false;
    return;
  }

  this.salario = this.formValidation.get('salary').value.replace(/\./g,'').replace(/\,/g,'');
  this.areaValue = this.formValidation.get('cmbSector').value;
  this.nivelValue = this.formValidation.get('cmbLevel').value;
  this.cargoValue = this.formValidation.get('cmbCargo').value;
  this.tamanoValue = this.formValidation.get('cmbTamano').value;
  this.ciudadValue = this.formValidation.get('cmbCiudad').value;

  let namedChartAnnotation = ChartAnnotation;
  namedChartAnnotation["id"]="annotation";
  Chart.pluginService.register( namedChartAnnotation);

  this.salarioService.getGraficoSalario(this.areaValue, this.nivelValue, this.cargoValue,  this.ciudadValue, this.tamanoValue, this.salario).subscribe(
    (data: any) =>  { 

      if (data[0].JsonGrafico1 == "" || data[0].JsonGrafico2 == "" || data[0].JsonGrafico3 == ""){
        Swal.fire({
          title: 'Ops!',
          text: `No hay coincidencias para los registros seleccionados`,
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
        return 
      }

      this.cargaSalario = 1;
  this.cd.detectChanges();

      // console.log(data);

       this.grafico1 = JSON.parse(data[0].JsonGrafico1)[0];
       this.grafico2total = JSON.parse(data[0].JsonGrafico2);
       this.grafico3total = JSON.parse(data[0].JsonGrafico3);
      
       this.cboFiltro = [...new Set(this.grafico2total.map(item => item.tipo))];

       this.grafico2 = this.grafico2total.filter(item => item.tipo == this.filtro);
       
       this.grafico3 = this.grafico3total.filter(item => item.tipo == this.filtro);
      

       let currency: CurrencyPipe = new CurrencyPipe('es-CO');
  
  this.BarChart = new Chart('barChart', {
    type: 'bar',
    scaleOverride : true,
    scaleSteps : 10,
    scaleStepWidth : 50,
    scaleStartValue : 100000,
  data: {
   labels: ["", "Salario", ""],
   datasets: [{
       label: 'Salario',
       
       data: [0, this.grafico1.consultado, 0],
       backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(54, 162, 235, 0.2)'
       ],
       borderColor: [
           'rgba(255,99,132,1)',
           'rgba(54, 162, 235, 1)',
           'rgba(255, 206, 86, 1)'
       ],
       borderWidth: 1
   }]
  }, 
  options: {
    tooltips: {
      mode: 'label',
      label: 'mylabel',
      callbacks: {
          label: function(tooltipItem, data) {
              return "$ " + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }, },
   },
    annotateDisplay: true,
    annotateLabel: "<%= '$' + Math.round(v3,0) %>",
    legend: {
      display: false
   },

    yAxes: [{
      ticks: {
          beginAtZero: false,
          callback: function(value, index, values) {
              return '';
          },
      },
      gridLines: {
          display: false,
          drawBorder: false,
      },
  }],
   annotation: {
    annotations: [
    {
      id: 'salarioMaxBox',
      type: 'box',
      xScaleID: 'x-axis-1',
      yScaleID: 'y-axis-0',
      xMin: 1,
      xMax: 3,
      yMin: this.grafico1.maximo,
      backgroundColor: 'rgb(75, 192, 192, 0.1)',
      //borderColor: 'rgb(255, 0, 0)',
      borderWidth: 1
    },

    {
      id: 'salarioPromedio',
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: this.grafico1.consultado,
      borderDash: [5, 5],
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 3,
      label: {
        enabled: true,
        content: `Tu Salario: ${currency.transform(this.grafico1.consultado.toFixed(0),'$').substr(0,currency.transform(this.grafico1.consultado.toFixed(0),'$').length-3)}`
      }
    },

    {
      id: 'salarioMaxLine',
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: this.grafico1.maximo,
      borderDash: [5, 5],
      borderColor: 'rgb(255, 255, 255)',
      borderWidth: 3,
      label: {
        enabled: true,
        content: `Salario Máximo: ${currency.transform(this.grafico1.maximo.toFixed(0),'$').substr(0,currency.transform(this.grafico1.maximo.toFixed(0),'$').length-3)}`
      }
    },
    {
      id: 'salarioMinBox',
      type: 'box',
      xScaleID: 'x-axis-1',
      yScaleID: 'y-axis-0',
      xMin: 1,
      xMax: 3,
      yMin: 0,
      yMax: this.grafico1.minimo,
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      //borderColor: 'rgb(255, 0, 0)',
      borderWidth: 1
    },{
      id: 'salarioMinLine',
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: this.grafico1.minimo,
      borderDash: [5, 5],
      borderColor: 'rgba(255, 0, 0, 0.3)',
      borderWidth: 3,
      label: {
        enabled: true,
        content:  `Salario Mínimo: ${currency.transform(this.grafico1.minimo.toFixed(0),'$').substr(0,currency.transform(this.grafico1.minimo.toFixed(0),'$').length-3)}`
      }
    }]
  },
  
   scales: {
       yAxes: [{
           ticks: {
               beginAtZero:true
           }
       }]
   }
  }
  });

  
  document.getElementById("btnCierraModal").click();
  this.calculadora = true;

    }, //end of (1)
    (error: any)   => console.log(error)
  );

  // var canvas = this.myChart;

  this.loader = false;
}

onChangeFilter(event){

  this.cboFiltro = [...new Set(this.grafico2total.map(item => item.tipo))];

  this.grafico2 = this.grafico2total.filter(item => item.tipo == this.filtro);
  
  this.grafico3 = this.grafico3total.filter(item => item.tipo == this.filtro);
 


}


  // Cargar tipos de documento
  getArea(){
    // this.loader = true;
    this.salarioService.getArea()
      .subscribe(
        (data: any) =>  { //start of (1)
          this.areas = data;
          // this.loader = false;
        }, //end of (1)
        (error: any)   => console.log(error)
      );
  }

  getNivelJerarquico(area: string){
    // this.loader = true;
    this.salarioService.getNivelJerarquico(area)
      .subscribe(
        (data: any) =>  { //start of (1)
          this.niveles = data;
          // this.loader = false;
        }, //end of (1)
        (error: any)   => {
          console.log(error);
          // this.loader = false;
        } 
      );
  }

  getCargos(area: string, nivel: string){
    // this.loader = true;
    this.salarioService.getCargo(area,nivel)
      .subscribe(
        (data: any) =>  { //start of (1)
          this.cargos = data;
          // this.loader = false;
        }, //end of (1)
        (error: any)   => {
          console.log(error);
          // this.loader = false;
        } 
      );
  }
  
  getTamanos(area: string, nivel: string, cargo: string){
    this.salarioService.getTamanoEmpresa(area,nivel,cargo)
      .subscribe(
        (data: any) =>  { //start of (1)
          this.tamanos = data;
        }, //end of (1)
        (error: any)   => {
          console.log(error);
          // this.loader = false;
        } 
      );
  }

  getCiudades(area: string, nivel: string, cargo: string){
    this.salarioService.getRegion(area,nivel,cargo)
      .subscribe(
        (data: any) =>  { //start of (1)
          this.regiones = data;
        }, //end of (1)
        (error: any)   => {
          console.log(error);
          // this.loader = false;
        } 
      );
  }

  cargarNivelesJerarquicos(area){
    this.areaValue = area;

    console.log(area);

    this.getNivelJerarquico(area);
  }

  cargarCargos(nivel){
    this.nivelValue = nivel;
    this.getCargos(this.areaValue,nivel);
  }

  cargarTamanosCiudades(cargo){
    this.cargoValue = cargo;
    this.getTamanos(this.areaValue,this.nivelValue,cargo);
    this.getCiudades(this.areaValue,this.nivelValue,cargo);
  }

  selectTamano(sel){
    this.tamanoValue = sel;
  }

  selectCiudad(sel){
    this.ciudadValue = sel;
  }

  onNavigate(){
    window.scroll(0,0);
    this.count=1;
  }

  goHome(){
    this.count=0;
  }
  scrollToElement($element){
    $("#"+$element)[0].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  
}
