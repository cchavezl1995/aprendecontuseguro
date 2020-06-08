import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

// Logs
import { LogsService } from "../../services/logs/logs.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-advisory-itt',
  templateUrl: './advisory-itt.component.html',
  styleUrls: ['./advisory-itt.component.scss']
})
export class AdvisoryIttComponent implements OnInit {

  public user;


  constructor(public login: LoginService, private log: LogsService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )

    if (this.route.snapshot.queryParamMap.get('p') != null) {
      this.router.navigate(["/asesoria-legal-itt"]);
    }
    window.scroll(0, 0);

    // Asignacion de datos al objeto usuairo
    this.user = this.login.getDataUser();
    if (this.login.isActive()) {
      this.log.addLog('asesoría legal ITT', 'ingresó a asesoría legal ITT');
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.login.isActive()) {
      this.log.addLog('asesoría legal ITT', 'salió a asesoría legal ITT');
    }
  }

}
