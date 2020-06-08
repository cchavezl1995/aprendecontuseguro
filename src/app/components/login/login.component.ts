import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';
import { DiccionarioService } from "../../services/diccionario.service";
import { Diccionario } from "../../interfaces/diccionario";
import { password, user } from 'src/app/config/variables';
import { UserLogin } from "../../interfaces/register/user-login";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from "../../../environments/environment";
import * as CryptoJS from 'crypto-js';

import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { InfoLocation } from 'src/app/interfaces/logs/logs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: UserLogin = { "usuario": "", "password": "", "sitioUsuario": `${user}`, "sitioPassword": `${password}`, "ip":""  }
  error: boolean = false;
  errorData: boolean = false;
  message: string = "";
  tiposDocumento: Diccionario[];
  eye: boolean = false;
  // Recuperacion de contraseñas
  count: number;
  muestraStrength: number;
  passwords = {
    password: "",
    passwordConfirm: ""
  }

  passwordBool: boolean = false;
  passwordConfirmBool: boolean = false;

  // Código de verificacion telefono celular
  codigo: string = "";
  errorNum: boolean = false;
  errorTipo: boolean = false;

  // Recuperacion de contraseña
  recovery = {
    identificacion: ''
  }

  recoveryCode = {
    id: '',
    code: ''
  }

  recoveryPassword = {
    id: '',
    password: ''
  }

  // 
  formLogin: FormGroup;
  loader: boolean;

  dataExtra: InfoLocation;
  constructor(private login: LoginService, private router: Router, private diccionario: DiccionarioService, public fb: FormBuilder) { }

  ngOnInit() {
    this.getTiposDoc();
    this.count = 0;

    this.login.getDataExtra().subscribe(res => {
      this.dataExtra = res;
      // console.log(this.dataExtra);
      
      this.form.ip = this.dataExtra.ip;
    }) 

    this.formLogin = this.fb.group({
      names: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    });
    if (this.login.isActive()) {
      this.router.navigate(['home']);
    }
  }

  showEye() {
    this.eye = !this.eye;
    if (this.eye) {
      $('#password').attr('type', 'text');
    } else {
      $('#password').attr('type', 'password');
    }

  }

  sendForm() {
    if (this.form.usuario == '' && this.form.password == '') {
      this.error = true;
      this.message = 'Debe diligenciar todos los campos.'
    } else {
      this.loader = true;
      this.login.login(this.form).subscribe(res => {
        // Retorna respuesta exitosa
        // console.log(res);
        if (res['codigo'] == 0) {
          // Guardamos el token en el localStorage
          localStorage.setItem('token', CryptoJS.AES.encrypt(res['data']['token'],"eco_scotia"));
          // Obtenemos los datos del usuario con session
          this.login.getSession(res['data']['token']).subscribe(
            res => {
              //  console.log(JSON.stringify(res));
              localStorage.setItem('user', CryptoJS.AES.encrypt(JSON.stringify(res),"eco_scotia"));
              
              this.loader = false;
              // this.router.navigate(['home']);
              window.location.reload();
            }
          );
        } else {
          this.loader = false;
          this.errorData = true;
          this.message = res['mensaje']
        }
      },
        (error: any) => {
          Swal.fire({
            title: 'Problemas!',
            text: 'Hubo un problema en la autenticación',
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
          this.loader = false;
        }
      )
    }
  }

  pass() {
    this.count++;
  }

  // Cargar tipos de documento
  getTiposDoc() {
    this.diccionario.getDiccionario(1)
      .subscribe(
        (data: any) => { //start of (1)
          this.tiposDocumento = data.data.$values;
          // console.log(this.tiposDocumento);
        }, //end of (1)
        (error: any) => console.log(error)
      );
  }

  goback() {
    this.count--;
  }

  validatePasswords() {
    let countError = 0;
    if (this.passwords.password == "") {
      countError++;
      this.passwordBool = true;
      this.message = 'Debe diligenciar todos los campos.';
    }

    if (this.passwords.passwordConfirm == "") {
      countError++;
      this.passwordConfirmBool = true;
      this.message = 'Debe diligenciar todos los campos.';
    }

    if (this.passwords.password != this.passwords.passwordConfirm) {
      countError++;
      this.passwordBool = true;
      this.passwordConfirmBool = true;
      this.message = "Las contraseñas no coinciden."
    }

    let pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,15}/
    // Verificacion de contraseñas con el patrón
    if (!pattern.test(this.passwords.password)) {
      countError++;
      this.passwordBool = true;
      this.passwordConfirmBool = false;
      this.message = `
        La nueva contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
        NO puede tener otros símbolos.
        Ejemplo:
        w3Unpocodet0d0
      `
    }else if(!pattern.test(this.passwords.passwordConfirm)){
      countError++;
      this.passwordBool = false;
      this.passwordConfirmBool = true;
      this.message = `
        La confirmación contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
        NO puede tener otros símbolos.
        Ejemplo:
        w3Unpocodet0d0
      `
    }


    if (countError == 0) {
      // Todo bien
      // console.log('Todo bien...');
      this.loader = true;
      this.recoveryPassword.password = this.passwords.password;
      this.recoveryPassword.id = this.recoveryCode.id;
      this.login.validatePassword(this.recoveryPassword).subscribe(
        res => {
          // console.log(res);
          if (res['codigo'] == 0) {
            this.message = "";
            this.error = false;
            this.pass();
            this.loader = false;
          } else if (res['codigo'] == 1) {
            this.loader = false;
            this.message = res['mensaje'];
            this.error = true;
          }
        }
      )

    }

  }

  validateRecovery() {
    // console.log('Validando identificacion...');

    let countError = 0;
    if (this.recovery.identificacion == '') {
      this.error = true;
      this.message = "Debes proporcionar un número de identificación.";
      countError++;
    }

    if (countError == 0) {
      this.loader = true;
      // console.log('validacion codigo...');
      this.login.recovery(this.recovery.identificacion).subscribe(
        res => {
          // console.log(res);
          if (res['codigo'] == 0) {
            this.recoveryCode.id = res['data'];
            this.message = "";
            this.error = false;
            this.pass();
            this.loader = false;
          } else if (res['codigo'] == 1) {
            this.message = res['mensaje'];
            this.error = true;
            this.loader = false;
          }
        }
      )
    }
  }

  validateCode() {

    let countError = 0;
    if (this.recoveryCode.code == '') {
      this.error = true;
      this.message = "Debes proporcionar un código.";
      countError++;
    }

    if (countError == 0) {
      this.login.validateCode(this.recoveryCode).subscribe(
        res => {
          this.loader = true;
          // console.log(res);
          if (res['codigo'] == 0) {
            this.message = "";
            this.error = false;
            this.pass();
            this.loader = false;
          } else if (res['codigo'] == 1) {
            this.message = res['mensaje'];
            this.error = true;
            this.loader = false;
          }
        }
      )
    }

  }



  onKeyUp(event: any) {

    let password: string = this.form.password;

    // console.log(password);

    this.checkStrength(password);
  }

  checkStrength(password: string) {
    var strength: number = 0;
    //If password contains both lower and uppercase characters, increase strength value.
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;

      $('.low-upper-case').addClass('text-success');
      $('.low-upper-case i').removeClass('fa-file-text').addClass('fa-check');
      $('#popover-password-top').addClass('hide');
    } else {
      $('.low-upper-case').removeClass('text-success');
      $('.low-upper-case i').addClass('fa-file-text').removeClass('fa-check');
      $('#popover-password-top').removeClass('hide');
    }

    //If it has numbers and characters, increase strength value.
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
      strength += 1;
      $('.one-number').addClass('text-success');
      $('.one-number i').removeClass('fa-file-text').addClass('fa-check');
      $('#popover-password-top').addClass('hide');

    } else {
      $('.one-number').removeClass('text-success');
      $('.one-number i').addClass('fa-file-text').removeClass('fa-check');
      $('#popover-password-top').removeClass('hide');
    }

    //If it has one special character, increase strength value.
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;
      $('.one-special-char').addClass('text-success');
      $('.one-special-char i').removeClass('fa-file-text').addClass('fa-check');
      $('#popover-password-top').addClass('hide');

    } else {
      $('.one-special-char').removeClass('text-success');
      $('.one-special-char i').addClass('fa-file-text').removeClass('fa-check');
      $('#popover-password-top').removeClass('hide');
    }

    if (password.length > 7) {
      strength += 1;
      $('.eight-character').addClass('text-success');
      $('.eight-character i').removeClass('fa-file-text').addClass('fa-check');
      $('#popover-password-top').addClass('hide');

    } else {
      $('.eight-character').removeClass('text-success');
      $('.eight-character i').addClass('fa-file-text').removeClass('fa-check');
      $('#popover-password-top').removeClass('hide');
    }

    // If value is less than 2

    if (strength < 2) {
      $('#result').removeClass()
      $('#password-strength').addClass('progress-bar bg-danger');

      $('#result').addClass('text-danger').text('Débil');
      $('#password-strength').css('width', '10%');
    } else if (strength == 2) {
      $('#result').removeClass('text-danger');
      $('#password-strength').removeClass('progress-bar bg-danger');
      $('#password-strength').addClass('progress-bar bg-warning');
      $('#result').addClass('text-warning').text('Moderada')
      $('#password-strength').css('width', '60%');
      return 'Week'
    } else if (strength == 4) {
      $('#result').removeClass('text-warning')
      $('#result').addClass('strong');
      $('#password-strength').removeClass('progress-bar bg-warning');
      $('#password-strength').addClass('progress-bar bg-success');
      $('#result').addClass('text-success').text('Fuerte');
      $('#password-strength').css('width', '100%');

      return 'Strong'
    }
  }

  onKeyUp2(event: any) {
    if (event.target.name == 'password') {
      this.checkStrength(event.target.value);
    }else if(event.target.name == 'passwordConfirm'){
      this.checkStrength2(event.target.value);
    }
  }

  checkStrength2(password:string) {
    var strength:number = 0;
    //If password contains both lower and uppercase characters, increase strength value.
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        strength += 1;

        $('.low-upper-case').addClass('text-success');
        $('.low-upper-case i').removeClass('fa-file-text').addClass('fa-check');
        $('#popover-password-top').addClass('hide');
    } else {
        $('.low-upper-case').removeClass('text-success');
        $('.low-upper-case i').addClass('fa-file-text').removeClass('fa-check');
        $('#popover-password-top').removeClass('hide');
    }

    //If it has numbers and characters, increase strength value.
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
        strength += 1;
        $('.one-number').addClass('text-success');
        $('.one-number i').removeClass('fa-file-text').addClass('fa-check');
        $('#popover-password-top').addClass('hide');

    } else {
        $('.one-number').removeClass('text-success');
        $('.one-number i').addClass('fa-file-text').removeClass('fa-check');
        $('#popover-password-top').removeClass('hide');
    }

    //If it has one special character, increase strength value.
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        strength += 1;
        $('.one-special-char').addClass('text-success');
        $('.one-special-char i').removeClass('fa-file-text').addClass('fa-check');
        $('#popover-password-top').addClass('hide');

    } else {
        $('.one-special-char').removeClass('text-success');
        $('.one-special-char i').addClass('fa-file-text').removeClass('fa-check');
        $('#popover-password-top').removeClass('hide');
    }

    if (password.length > 7) {
        strength += 1;
        $('.eight-character').addClass('text-success');
        $('.eight-character i').removeClass('fa-file-text').addClass('fa-check');
        $('#popover-password-top').addClass('hide');

    } else {
        $('.eight-character').removeClass('text-success');
        $('.eight-character i').addClass('fa-file-text').removeClass('fa-check');
        $('#popover-password-top').removeClass('hide');
    }

    // If value is less than 2

    if (strength < 2) {
        $('#result2').removeClass()
        $('#password-strength2').addClass('progress-bar2 bg-danger');

        $('#result2').addClass('text-danger').text('Débil');
        $('#password-strength2').css('width', '10%');
    } else if (strength == 2) {
        $('#result2').removeClass('text-danger');
        $('#password-strength2').removeClass('progress-bar2 bg-danger');
        $('#password-strength2').addClass('progress-bar2 bg-warning');
        $('#result2').addClass('text-warning').text('Moderada')
        $('#password-strength2').css('width', '60%');
        return 'Week'
    } else if (strength == 4) {
        $('#result2').removeClass('text-warning')
        $('#result2').addClass('strong');
        $('#password-strength2').removeClass('progress-bar2 bg-warning');
        $('#password-strength2').addClass('progress-bar2 bg-success');
        $('#result2').addClass('text-success').text('Fuerte');
        $('#password-strength2').css('width', '100%');

        return 'Strong'
    }
  }

}
