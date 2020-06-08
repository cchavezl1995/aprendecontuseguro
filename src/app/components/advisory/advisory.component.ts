import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
// Logs
import { LogsService } from "../../services/logs/logs.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advisory',
  templateUrl: './advisory.component.html',
  styleUrls: ['./advisory.component.scss']
})
export class AdvisoryComponent implements OnInit {
  
  public user;
  public count: number = 0;
  
  constructor(public login: LoginService, private log: LogsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.count = 0;
    window.scroll(0,0);

    // Asignacion de datos al objeto usuairo
    this.user = this.login.getDataUser();
    if (this.login.isActive()) {
      this.log.addLog('asesoría legal','ingresó a asesoría legal');
    }
    if(this.route.snapshot.queryParamMap.get('p')!=null){
      this.count=1;  
    }
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.login.isActive()) {
      this.log.addLog('asesoría legal','salió a asesoría legal');
    }
    
  }

  public increment(){
    window.scroll(0, 0);
    this.login.verifySesion();
    this.count++;  
  }

  public decrement(){
    window.scroll(0, 0);
    this.login.verifySesion(); 
    this.count--;
  }

}
