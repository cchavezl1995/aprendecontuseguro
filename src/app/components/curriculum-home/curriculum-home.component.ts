import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { ActivatedRoute } from '@angular/router';
import { LogsService } from 'src/app/services/logs/logs.service';



@Component({
  selector: 'app-curriculum-home',
  templateUrl: './curriculum-home.component.html',
  styleUrls: ['./curriculum-home.component.scss']
})
export class CurriculumHomeComponent implements OnInit {
  
  public user;
  public count: number = 0;

  constructor(public login: LoginService, private route: ActivatedRoute,
    private logs:LogsService) { }
  
  AddLog(pagina: string, control: string, extra?: string){
      if(this.login.isActive()){
        this.logs.addLog(pagina,control,extra);
      }
    }
  

  ngOnInit() {

    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )
    
    this.count = number?number:0;
    if(this.route.snapshot.queryParamMap.get('p')!=null){
      this.count = parseInt(this.route.snapshot.queryParamMap.get('p'));    
    }

    // Asignacion de datos al objeto usuairo
    this.user = this.login.getDataUser();
    window.scroll(0,0);
  }
  
  public increment(){
    window.scroll(0, 0);
    this.count++;  
  }

  public decrement(){
    window.scroll(0, 0);    
    this.count--;
  }

  public goHome(){
    // console.log(this.count);
    window.scroll(0, 0);    
    this.count = 0;
    // console.log(this.count);
    
  }

}
