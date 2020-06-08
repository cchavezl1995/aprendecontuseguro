import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { LoginService } from "../../../services/login.service";
import jspdf from 'jspdf';
import { LogsService } from 'src/app/services/logs/logs.service';
import { registerLocaleData } from '@angular/common';
import { color } from 'html2canvas/dist/types/css/types/color';
import { nonWhiteSpace } from 'html2canvas/dist/types/css/syntax/parser';
import jsPDF from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-economy-study-service',
  templateUrl: './economy-study-service.component.html',
  styleUrls: ['./economy-study-service.component.scss']
})
export class EconomyStudyServiceComponent implements OnInit {
 
  constructor(public login: LoginService, public log: LogsService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    window.scroll(0, 0);

    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )

    if (this.route.snapshot.queryParamMap.get('p') != null) {
      this.router.navigate(["/estudia-economia-servicio"]);
    }
  }
  
}
