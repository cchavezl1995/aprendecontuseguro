import { Component, OnInit, NgZone } from '@angular/core';
import { LoginService } from "../../../services/login.service";
import { DiccionarioService } from 'src/app/services/diccionario.service';
import { LogsService } from "../../../services/logs/logs.service";
import { ScorecreditService } from "../../../services/scorecredit.service";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { $ } from 'protractor';

@Component({
  selector: 'app-score-credit-ejercicio',
  templateUrl: './score-credit-ejercicio.component.html',
  styleUrls: ['./score-credit-ejercicio.component.scss']
})
export class ScoreCreditEjercicioComponent implements OnInit {
  private chart: am4charts.XYChart;
  loader: boolean;
  pagina: number;
  scoreInfo: any = {};
  moduloScore: number = 0;
  autorizaAlertas: boolean;

  constructor(private diccionarioService: DiccionarioService, private zone: NgZone,
    public login: LoginService, private log: LogsService, public score: ScorecreditService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.pagina = 0; 
    window.scroll(0,0);

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

    this.go();
     
    // console.log(this.scoreInfo);

  }
  
  iniciarScore() {
    this.pagina = 1;
    window.scroll(0,0)
  }

  go() {
    window.scroll(0,0)
    this.pagina = 2;
    this.zone.run(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
    this.loader = true;

    let form = {
      "password": "Kq4@ubwMSxr=fS#S",
      "username": "cardif_usr_prd",
      "grant_type": "password",
      "documentType": "1",
      "document": this.login.getDataUser().identificacion,
      "lastName": this.login.getDataUser().nombres.toString()+" "+this.login.getDataUser().apellidoPaterno.toString()
    }

    this.score.getScoreCredit(form).subscribe(
      res => {
        if (res) {
          this.scoreInfo = res;
          console.log(this.scoreInfo);

          document.getElementById("scoreHTML").innerHTML = this.scoreInfo['scoreHTML'];
          // this.zone.runOutsideAngular(() => {
          //   setTimeout(() => {
          //     let chart = am4core.create("chartdiv", am4charts.GaugeChart);
          //     chart.hiddenState.properties.opacity = 0;
          //     chart.innerRadius = -15;

          //     let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
          //     axis.min = 150;
          //     axis.max = 950;
          //     axis.strictMinMax = true;
          //     axis.strictMinMax = true;
          //     axis.renderer.useChartAngles = true;
          //     axis.renderer.minGridDistance = 300;

          //     let colorSet = new am4core.ColorSet();

          //     let gradient = new am4core.LinearGradient();
          //     gradient.stops.push({ color: am4core.color("red") })
          //     gradient.stops.push({ color: am4core.color("yellow") })
          //     gradient.stops.push({ color: am4core.color("green") })

          //     axis.renderer.line.stroke = gradient;
          //     axis.renderer.line.strokeWidth = 15;
          //     axis.renderer.line.strokeOpacity = 1;

          //     axis.renderer.grid.template.disabled = true;
          //     // axis.renderer.labels.template.adapter.add("text", function(text) {
          //     //   return text + "%";
          //     // })

          //     let hand = chart.hands.push(new am4charts.ClockHand());
          //     hand.radius = am4core.percent(95);
          //     hand.startWidth = 10;
          //     hand.pin.disabled = true;
          //     hand.innerRadius = am4core.percent(80);

          //     hand.showValue(parseInt(this.scoreInfo['score']['puntaje']), 300000000, am4core.ease.cubicOut);

          //     let legend = new am4charts.Legend();
          //     legend.isMeasured = false;
          //     legend.y = am4core.percent(100);
          //     legend.verticalCenter = "bottom";
          //     legend.parent = chart.chartContainer;

          //     var label = chart.radarContainer.createChild(am4core.Label);
          //     label.isMeasured = false;
          //     label.fontSize = 45;
          //     label.x = am4core.percent(50);
          //     label.y = am4core.percent(100);
          //     label.horizontalCenter = "middle";
          //     label.verticalCenter = "bottom";
          //     label.text = hand.value+ " Puntos";

          //     // legend.data = [{
          //     //   "name": `${hand.value} Puntos`
          //     // }];
          //     this.chart = chart;
          //   }, 1000)
          // });
        }else{
          Swal.fire({
            title: '',
            text: `Aún no cuentas con información de score crédito.`,
            type: 'info',
            confirmButtonText: 'Aceptar'
          }).then(
            res => {
              this.pagina = 0;
            }
          );
        }
        this.loader = false;
      }
    );

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


  irDetalleScore(id) {
    this.pagina = 3;
    this.moduloScore=id;  
  }

}
