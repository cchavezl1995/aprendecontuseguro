import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  socios: String[] = [];

  cencosud: boolean = false;
  codensa: boolean = false;
  scotiabank: boolean = false;

  constructor(public login: LoginService ) {
    this.socios = this.login.getSocios();
    console.log(this.socios);
    
   }

  ngOnInit() {
  }

  cambiarLogo(n){
    return this.socios.includes(n)?true:false;
  }

}
