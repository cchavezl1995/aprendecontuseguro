import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SalarioService } from "../../services/salario.service";
import { LoginService } from "../../services/login.service";
import { ActivatedRoute, Router } from '@angular/router';
import { LogsService } from 'src/app/services/logs/logs.service';




@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  //loader
  loader:boolean = false;

  constructor(private salarioService: SalarioService, private cd: ChangeDetectorRef, public login: LoginService,private route: ActivatedRoute, private log:LogsService, public router: Router) { }
  AddLog(pagina: string, control: string, extra?: string){
    if(this.login.isActive()){
      this.log.addLog(pagina,control,extra);
    }
  }

  ngOnInit() { 
    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )
    
    if(this.route.snapshot.queryParamMap.get('p')!=null){
      this.router.navigate(["/comparar-salario"]);
    }
    
    window.scroll(0,0);
  }
}
