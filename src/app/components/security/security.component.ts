import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

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
      this.router.navigate(["/seguridad-informatica"]);
    }
    // Asignacion de datos al objeto usuairo
    this.user = this.login.getDataUser();
  }

}
