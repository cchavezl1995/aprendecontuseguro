import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(public login: LoginService) { }

  loader: boolean = false;
  pagina: number = 0;
  ngOnInit() {
    this.login.verifySesion();
  }

}
