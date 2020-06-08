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
  selector: 'app-score-credit-resultado',
  templateUrl: './score-credit-resultado.component.html',
  styleUrls: ['./score-credit-resultado.component.scss']
})
export class ScoreCreditResultadoComponent implements OnInit {
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
            // console.log(this.scoreInfo);
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
