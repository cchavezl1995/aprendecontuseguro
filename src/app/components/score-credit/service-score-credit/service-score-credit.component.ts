import { Component, OnInit, NgZone } from '@angular/core';
import { LoginService } from "../../../services/login.service";
import { DiccionarioService } from 'src/app/services/diccionario.service';
import { LogsService } from "../../../services/logs/logs.service";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { $ } from 'protractor';
import { ScorecreditService } from 'src/app/services/scorecredit.service';


@Component({
  selector: 'app-service-score-credit',
  templateUrl: './service-score-credit.component.html',
  styleUrls: ['./service-score-credit.component.scss']
})
export class ServiceScoreCreditComponent implements OnInit {
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

    
     
    // console.log(this.scoreInfo);

  }
  
  iniciarScore() {
    this.pagina = 1;
    window.scroll(0,0)
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
