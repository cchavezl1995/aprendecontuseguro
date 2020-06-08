import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AlertasFraudeService } from "../../../services/alertas-fraude.service";
import Swal from 'sweetalert2';
// Logs
import { LogsService } from "../../../services/logs/logs.service";
import { AlertFraudes } from 'src/app/interfaces/alert-fraudes';
import { FormGroup } from '@angular/forms';
import { UserLogin } from 'src/app/interfaces/register/user-login';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alert-notifications-confirm',
  templateUrl: './alert-notifications-confirm.component.html',
  styleUrls: ['./alert-notifications-confirm.component.scss']
})
export class AlertNotificationsConfirmComponent implements OnInit {

  loader: boolean;
  fono: string;
  mail: string;
  habilitado: boolean;
  alertaNotificacion: AlertFraudes = {};
  user: any;
  autorizaAlertas: boolean;
  guardado: boolean;
  constructor(public login: LoginService, public alertNot: AlertasFraudeService, private log: LogsService, private route: ActivatedRoute) { }
  pagina: number;
  api: String;
  ngOnInit() {
    this.pagina = 0;

    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )

    this.pagina = number ? number : 0;
    if (this.route.snapshot.queryParamMap.get('p') != null) {
      this.pagina = parseInt(this.route.snapshot.queryParamMap.get('p'));
    }
    window.scroll(0, 0);
    this.user = this.login.getDataUser();
    if (this.login.isActive()) {
      this.fono = String(this.user['numeroCelular']);
      this.mail = this.user['correoElectronico'];
    }
    this.respuesta();

  }
  startNotification() {
    window.scroll(0, 0);
    this.pagina = 2;
  }
  endNotification() {
    this.loader = true;
    this.alertaNotificacion.idUsuario = this.user.idUsuario;
    this.alertaNotificacion.telefono = this.fono;
    this.alertaNotificacion.email = this.mail;
    this.alertaNotificacion.habilitado = this.habilitado;
    this.alertNot.configNotifications(this.alertaNotificacion).subscribe(
      res => {
        // console.log(res);
        if (res['codigo'] == 0) {
          Swal.fire({
            title: 'Éxito',
            text: 'Tu configuración ha sido actualizada.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then(result => {
            if (result) {
              window.scroll(0, 0);
              this.pagina = 3;
            }
          });
        } else {
          Swal.fire({
            title: 'Éxito',
            text: 'Tu configuración ha sido actualizada.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
        this.loader = false;
      }
    )
    this.loader = true;
  }

  respuesta() {    
    this.alertNot.result(this.user.idUsuario).subscribe(
      res => {
        // console.log(res);
        if (res['codigo'] == 0) {
          this.habilitado = true;
        } else if(res['codigo'] == 1) {
          this.habilitado = false;
        }
        
      }
    )
  }

}
