import { Component, OnInit, HostListener } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from "src/app/services/register.service";
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { Diccionario } from 'src/app/interfaces/diccionario';
import { DiccionarioService } from 'src/app/services/diccionario.service';
import { UserLogin } from 'src/app/interfaces/register/user-login';
import { password, user } from 'src/app/config/variables';
import { ContactService } from "src/app/services/contact.service";
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  socials = [
    {
      id: 1,
      name: 'Canal de contacto',
      icon: 'fas fa-info mt-2',
      color: '#d8d8d8',
      type: '',
      value: '',
      show: true
    }
  ];

  redes = []

  constructor(private diccionarioService: DiccionarioService, public login: LoginService, public reg: RegisterService,
    public contact: ContactService) { }
  form: UserLogin = {};
  pagina: number = 0;
  jsonPersonalInfo: any = {};
  jsonPassword: any = {};
  nombres: string;
  apellidos: string;
  correoElectronico: string;
  numeroCelular: string;
  tiposDocumento: Diccionario[];
  tipoDocumento: string;
  nroDocumento: string;
  loader: boolean = false;
  claveNueva: string = "";
  claveActual: string = "";
  claveConfirmada: string = "";
  isplaceNumber: boolean = true;

  ngOnInit() {
    this.login.verifySesion();
    this.nombres = this.login.getDataUser().nombres;
    this.apellidos = this.login.getDataUser().apellidoPaterno;
    this.correoElectronico = this.login.getDataUser().correoElectronico;
    this.numeroCelular = this.login.getDataUser().numeroCelular;
    this.nroDocumento = this.login.getDataUser().identificacion;
    this.getTipoDocumento();
    this.form = { "usuario": this.nroDocumento, "password": this.login.getDataUser().clave, "sitioUsuario": `${user}`, "sitioPassword": `${password}` }
    this.getContacts();
  }

  getContacts() {
    this.contact.getContacts(this.login.getDataUser().idUsuario).subscribe(
      (res: any) => {
        // console.log(res);  
        this.redes = res;
      }
    )
  }

  guardarDatosPersonales() {
    var re = /[a-zA-Z ]+.*@[^ÑñáéíóúÁÉÍÓÚ]+.[com,org,co,net,es]+$/;
    if (!re.test(this.correoElectronico)) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Correo inválido, por favor verifícalo',
        type: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.jsonPersonalInfo = {
      "idUsuario": this.login.getDataUser().idUsuario,
      "nombres": this.nombres,
      "apellidoPaterno": this.apellidos,
      "apellidoMaterno": "",
      "correoElectronico": this.correoElectronico,
      "numeroCelular": this.numeroCelular
    };

    this.loader = true;
    this.reg.changePersonalInfo(this.jsonPersonalInfo).subscribe(
      (data: any) => {
        this.logearNuevamente(1);

      }
    );
  }
  guardarPassword() {
    let pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,15}/
    // Verificacion de contraseñas con el patrón
    if (!pattern.test(this.claveNueva)) {
      Swal.fire({
        title: 'Advertencia',
        text: `
        La nueva contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
        NO puede tener otros símbolos.
        Ejemplo:
        w3Unpocodet0d0
        `,
        type: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    } else if (!pattern.test(this.claveConfirmada)) {
      Swal.fire({
        title: 'Advertencia',
        text: `
        La confirmación contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
        NO puede tener otros símbolos.
        Ejemplo:
        w3Unpocodet0d0
        `,
        type: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (this.claveActual == this.login.getDataUser().clave) {
      if (this.claveNueva == this.claveConfirmada) {
        this.jsonPassword = {
          "idUsuario": this.login.getDataUser().idUsuario,
          "clave": this.claveNueva
        };
        this.loader = true;
        this.reg.changePassword(this.jsonPassword).subscribe(
          (data: any) => {
            this.login.logOut()
          }
        );
      } else {
        Swal.fire({
          title: 'Advertencia',
          text: 'La confirmación de la contraseña no coincide.',
          type: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }

    } else {
      Swal.fire({
        title: 'Advertencia',
        text: 'La contraseña actual no coincide con nuestros registros.',
        type: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  getTipoDocumento() {
    this.diccionarioService.getDiccionario(1)
      .subscribe(
        (data: any) => {
          this.tiposDocumento = data.data;
          this.tipoDocumento = this.tiposDocumento.filter(item => item.id == this.login.getDataUser().dicTipoDocumento)[0].text;
          // console.log(this.tiposDocumento)
          // console.log(this.tipoDocumento)
        },
        (error: any) => console.log(error)
      );
  }
  logearNuevamente(i) {

    this.login.login(this.form).subscribe(res => {
      // Retorna respuesta exitosa
      // console.log(res);
      // Guardamos el token en el localStorage
      localStorage.setItem('token', CryptoJS.AES.encrypt(res['data']['token'], "eco_scotia"));
      // Obtenemos los datos del usuario con session
      this.login.getSession(res['data']['token']).subscribe(
        res => {
          // console.log(JSON.stringify(res));
          localStorage.setItem('user', CryptoJS.AES.encrypt(JSON.stringify(res), "eco_scotia"));
          this.loader = false;
          if (i == 1) {
            Swal.fire({
              title: 'Éxito',
              text: 'Tu información personal ha sido actualizada',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
          if (i == 2) {
            Swal.fire({
              title: 'Éxito',
              text: 'Tu contraseña ha sido actualizada',
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.claveNueva = "";
            this.claveActual = "";
            this.claveConfirmada = "";
          }
        });
    });
  }

  addSocial(e) {
    // console.log(this.socials[0]);


    if (this.socials[0].value == '' || this.socials[0].type == '') {
      Swal.fire({
        title: 'Ops!',
        text: 'Debes diligenciar los campos',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });

      return;
    }

    this.socials[0].show = true;

    let element = {
      tipoContacto: this.socials[0].type,
      contacto: this.socials[0].value,
      idUsuario: this.login.getDataUser().idUsuario
    }

    // console.log(element);


    this.contact.createContact(element).subscribe(
      res => {
        // console.log(res);
        this.getContacts();
      }
    )

    // this.redes.push(element);

    // Limpiar campos
    this.socials[0].type = '';
    this.socials[0].value = '';

  }

  deleteSocial(e) {
    // console.log('remove social ',e);
    this.contact.deleteContact(e).subscribe(
      res => {
        // console.log(res);        
      }
    );

    let item = this.redes.findIndex(x => x.id == e);
    this.redes.splice(item, 1);
  }

  toggleSocial() {
    this.socials[0].show = false;
  }

  cancellSocial(e) {
    this.socials[0].show = true;
  }

  onKeyUp(event: any) {
    if (event.target.name == 'claveNueva') {
      this.checkStrength(event.target.value);
    } else if (event.target.name == 'claveConfirmada') {
      this.checkStrength2(event.target.value);
    }
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

  checkStrength2(password: string) {
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

  isNumber(event: KeyboardEvent) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter
      [46, 8, 9, 27, 13].indexOf(charCode) !== -1 || 
      (charCode === 65 && event.ctrlKey === true) || // Allow: Ctrl+A
      (charCode === 67 && event.ctrlKey === true) || // Allow: Ctrl+C
      (charCode === 86 && event.ctrlKey === true) || // Allow: Ctrl+V
      (charCode === 88 && event.ctrlKey === true) || // Allow: Ctrl+X
      (charCode === 65 && event.metaKey === true) || // Cmd+A (Mac)
      (charCode === 67 && event.metaKey === true) || // Cmd+C (Mac)
      (charCode === 86 && event.metaKey === true) || // Cmd+V (Mac)
      (charCode === 88 && event.metaKey === true) || // Cmd+X (Mac)
      (charCode >= 35 && event.keyCode <= 39) // Home, End, Left, Right
    ) {
      return;  // let it happen, don't do anything
    }
    //console.log(charCode);
    
    // valida solo los numeros con el codigo ascci
    if ((charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) {
      return false;
    }
    return true;
  }
    
  placeText(e) {
    //console.log('entro!');
    this.isplaceNumber = !this.isplaceNumber;
  }
}

