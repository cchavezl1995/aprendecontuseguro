import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LogsService } from "../../services/logs/logs.service";
@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {

  public user;

  url:string;
  constructor(public login: LoginService, private route: ActivatedRoute,private cookieService: CookieService, private logs:LogsService) { }

  AddLog(pagina: string, control: string, extra?: string){
    if(this.login.isActive()){
      this.logs.addLog(pagina,control,extra);
    }
  }

  ngOnInit() {
    window.scroll(0,0);
    let l = "."+window.location.hostname;
  
    // this.cookieService.set('ssoCuquie', this.login.getToken(),3,"/",l,true,"Lax");
    this.setCookie('ssoCuquie', this.login.getToken(),2,window.location.hostname.replace('www.',''));
    if(this.route.snapshot.queryParamMap.get('p')!=null){
      this.onNavigate();    
    }
    this.logs.addLog('Study','Ingreso a modulo de coursera');
  }

  onNavigate(){
    this.logs.addLog('Study','Navegando a página de coursera');
    this.url = "https://www.coursera.org/programs/kg16p?attemptSSOLogin=true&authMode=login&authProvider=scotiabank"
    window.open(this.url, "_blank");
  }

  setCookie(cname, cvalue, exdays, dom) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain="+dom;
  }

}
