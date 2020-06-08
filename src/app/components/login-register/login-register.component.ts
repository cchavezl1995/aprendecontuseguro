import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  idModule: number;
  activeModule: boolean;
  showModule: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // console.log(params.get('id'))
      this.idModule = parseInt(params.get('id'));
    });    

    if (this.idModule == 1) {
      // document.getElementById('login').click();
      this.activeModule = true;
      this.showModule = true;
    } 
    
    if(this.idModule == 2) {
      // document.getElementById('register').click();
      this.activeModule = false;
      this.showModule = false;
    } 
    
    if(this.idModule == 3) {
      this.activeModule = !this.activeModule;
      this.showModule = !this.showModule;
    }
  }
  limpiarLogin(){
    
  }
}
