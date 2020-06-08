import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { LogsService } from 'src/app/services/logs/logs.service';

@Component({
  selector: 'app-entreview',
  templateUrl: './entreview.component.html',
  styleUrls: ['./entreview.component.scss']
})
export class EntreviewComponent implements OnInit {

  user;
  constructor(public login: LoginService, private route: ActivatedRoute, private log:LogsService) { }
  
  count: number;
  AddLog(pagina: string, control: string, extra?: string){
    if(this.login.isActive()){
      this.log.addLog(pagina,control,extra);
    }
  }

  ngOnInit() {
    window.scroll(0,0);
    this.count = 0;
    // Asignacion de datos al objeto usuairo
    this.user = this.login.getDataUser();
  }
  increment(){
    this.count++;
  }
  decrement(){
    this.count--;
  }

}
