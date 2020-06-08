import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-security-service',
  templateUrl: './security-service.component.html',
  styleUrls: ['./security-service.component.scss']
})
export class SecurityServiceComponent implements OnInit {

  user;
  constructor(public login: LoginService, private route: ActivatedRoute, public router: Router) { }


  ngOnInit() {
    window.scroll(0, 0);
    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )
    if (this.route.snapshot.queryParamMap.get('p') != null) {
      this.router.navigate(["/seguridad-informatica-servicio"]);
    }

    // Asignacion de datos al objeto usuairo
    this.user = this.login.getDataUser();
  }
}
