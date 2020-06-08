import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../services/login.service";
// Logs
import { LogsService } from "../../../services/logs/logs.service";
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-advisory-service',
  templateUrl: './advisory-service.component.html',
  styleUrls: ['./advisory-service.component.scss']
})
export class AdvisoryServiceComponent implements OnInit {
  public user;
  
  constructor(public login: LoginService, private log: LogsService, private route: ActivatedRoute, public router: Router) {
  }
  AddLog(pagina: string, control: string, extra?: string){
    if(this.login.isActive()){
      this.log.addLog(pagina,control,extra);
    }
  }
  ngOnInit() {
    window.scroll(0,0);

    // Asignacion de datos al objeto usuairo
    this.user = this.login.getDataUser();
    if (this.login.isActive()) {
      this.log.addLog('asesoría legal','ingresó a asesoría legal');
    }
    if(this.route.snapshot.queryParamMap.get('p')!=null){
      this.router.navigate(["/asesoria-legal-servicio"]);
    }
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.login.isActive()) {
      this.log.addLog('asesoría legal','salió a asesoría legal');
    }
    
  }

  
}
