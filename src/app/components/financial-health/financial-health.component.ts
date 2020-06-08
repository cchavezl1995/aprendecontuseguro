import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { SaludfinService } from 'src/app/services/salud-fin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-financial-health',
  templateUrl: './financial-health.component.html',
  styleUrls: ['./financial-health.component.scss']
})
export class FinancialHealthComponent implements OnInit {
  constructor(public login: LoginService, public sf: SaludfinService,  private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    window.scroll(0, 0);
    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )
    if (this.route.snapshot.queryParamMap.get('p') != null) {
      this.router.navigate(["/salud-financiera"]);
    }
  }
}
