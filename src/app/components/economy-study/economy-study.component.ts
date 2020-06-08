import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { LoginService } from "../../services/login.service";

import { LogsService } from 'src/app/services/logs/logs.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-economy-study',
  templateUrl: './economy-study.component.html',
  styleUrls: ['./economy-study.component.scss']
})
export class EconomyStudyComponent implements OnInit {
  constructor(public login: LoginService, public log: LogsService, private route: ActivatedRoute, public router: Router) { }
  ngOnInit() {
    window.scroll(0, 0);

    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )
    if (this.route.snapshot.queryParamMap.get('p') != null) {
      this.router.navigate(["/estudia-economia"])
    }
  }
}
