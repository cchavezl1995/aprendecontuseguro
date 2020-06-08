import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { RegisterService } from "../../services/register.service";
import { Document } from "../../interfaces/document";
import { DiccionarioService } from "../../services/diccionario.service";
import { Diccionario } from "../../interfaces/diccionario";
import { UserInfo } from "../../interfaces/register/user-info";
import { UserUpdate } from "../../interfaces/register/user-update";
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  items: MenuItem[];
  count: number;
  countError: number;
  errorTipo: boolean;
  errorNum: boolean;
  message: string;
  form: Document;
  form2: UserUpdate;
  tiposDocumento: Diccionario[];
  eye: boolean = false;
  // Usuario no existente
  noUser: boolean = true;

  // Campos menejo segundo paso
  alert: boolean = false;
  userInfo: UserInfo;

  // Campos tercer paso
  
  phoneBool: boolean;
  emailBool: boolean;
  passwordBool: boolean;
  passwordConfBool: boolean;

  // Form validador
  formRegister: FormGroup;
  submitted: boolean = false;

  // Loader
  loader: boolean;


  constructor(private register: RegisterService, private diccionario: DiccionarioService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.items = [
      {label: 'Paso 1'},
      {label: 'Paso 2'},
      {label: 'Paso 3'}
    ];

    this.form = {
      tipoDocumento: "",
      idTipoDocumento: ""
    }
    this.form2 = {
      phone: "",
      email: "",
      password: ""
    }
    this.formRegister = new FormGroup({
      // Validators.pattern('[a-zA-Z]')
      phone: new FormControl('', Validators.compose( [Validators.required,Validators.pattern('^[0-9]{9,15}$')])),
      email:new FormControl('', Validators.compose( [Validators.required, Validators.pattern('[a-zA-Z ]+.*@[^ÑñáéíóúÁÉÍÓÚ]+.[com,org,co,net,es,cl]')])),
      password: new FormControl('',  Validators.compose( [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,15}')])),
      check: new FormControl(false,  Validators.compose( [Validators.required])),
    });

    this.initialize();
    this.getTiposDoc();
    if(this.route.snapshot.queryParamMap.get('doc')!=null){
      this.form.idTipoDocumento = this.route.snapshot.queryParamMap.get('idT');
      this.form.tipoDocumento = this.route.snapshot.queryParamMap.get('doc');
      this.validator();
    }
  }

  showEye(){
    this.eye = !this.eye;
    if(this.eye){
      $('#password').attr('type','text');
    }else{
      $('#password').attr('type','password');
    }
   
  }

  // convenience getter for easy access to form fields
  get f() { return this.formRegister.controls; }

  onSubmit(){
    this.submitted = true;
    console.log('enviando formulario...');

    if (this.formRegister.invalid) {
      this.message = 'Debe diligenciar todos los campos.';
      return;
    }



    // Activar disclamer
    document.getElementById('showModal').click();
    
  }

  initialize(){
    this.count = 0;
    this.countError = 0;
    this.errorTipo = false;
    this.errorNum = false;
    this.message = "";
  }

  initialize2(){
    this.count = 2;
    this.phoneBool=false;
    this.emailBool=false;
    this.passwordBool=false;
    this.passwordConfBool=false;
  }

  // Cargar tipos de documento
  getTiposDoc(){
    this.loader = true;
    this.diccionario.getDiccionario(1)
      .subscribe(
        (data: any) =>  { //start of (1)
          this.tiposDocumento = data.data;
          // console.log(this.tiposDocumento);
          this.loader = false;
        }, //end of (1)
        (error: any)   => {console.log(error);this.loader = false;}
      );
  }

  pass(){
    this.count++;
  }

  goback(){
    this.noUser = true;
    this.alert = false;
    this.form = {
      tipoDocumento: "",
      idTipoDocumento: ""
    }
    // console.log(this.count);
  }

  validator(){
    // Reiniciamos valores
    this.initialize();
    // console.log(this.countError);
    
    if (this.form.tipoDocumento == "") {
      this.errorNum = true;
      this.message = 'Debe diligenciar todos los campos.';
      this.countError++;
    }
    
    if(this.form.idTipoDocumento == ""){
      this.errorTipo = true;
      this.message = 'Debe diligenciar todos los campos.';
      this.countError++;
    }

    if (this.countError == 0) {
      // Todo bien, llama api
      this.query();
    }
  }

  validator2(){
    // console.log(this.form2);
    // debugger;
    // Reiniciamos valores
    this.countError = 0;
    this.initialize2();
    // console.log(this.countError);
    
    if (this.form2['phone'] == "") {
      this.phoneBool = true;
      this.message = 'Debe diligenciar todos los campos.';
      this.countError++;
    }
    
    if(this.form2['email'] == ""){
      this.emailBool = true;
      this.message = 'Debe diligenciar todos los campos.';
      this.countError++;
    }

    if(this.form2['password'] == ""){
      this.passwordBool = true;
      this.message = 'Debe diligenciar todos los campos.';
      this.countError++;
    }

    if (this.countError == 0) {
      console.log('todo correcto!...');

      document.getElementById('showModal').click();
    }

  }

  query(){
    // console.log('query...');
    this.loader = true;
    this.register.query(this.form).subscribe(
      res => {
        console.log(res);
        if (res['Codigo']==1 ) {
          this.message = res['Mensaje']
          this.alert = true;
          this.noUser = false;
        }else if (res['Codigo']==2 ) {
          this.message = res['Mensaje']
          this.alert = true;
        } else if(res['Codigo']==0){
          this.userInfo = res['user'];
          console.log(this.userInfo);
          this.pass();
        }
        this.loader = false;
      }
    )
  }

  preRegister(){
    // Construccion de JSON final para inserción
    let json = {
      clave: this.formRegister.get('password').value,
      email: this.formRegister.get('email').value,
      fono: `57${this.formRegister.get('phone').value}`,
      idUsuario: this.userInfo['idusuario']
    };
      
    // Llamado al API para actualizar
    // console.log(json);
    this.registerUser(json);
  }

  registerUser(form2){
    this.loader = true;
    this.register.register(form2).subscribe(
      res => {
        // console.log(res);
        if (res['Codigo']==1 || res['Codigo']==2) {
          this.message = res['Mensaje']
          this.alert = true;
        }else if(res['Codigo']==0){
          this.userInfo = res['user'];
          this.pass();
          document.getElementById('btnCierraModal').click();
        }
        this.loader = false;
      }
    )
  }

  showModal(){
    document.getElementById('show').click();
  }

  onKeyUp(event: any) {

    let password:string = this.formRegister.get('password').value;

    // console.log(password);

    this.checkStrength(password);
  }

  checkStrength(password:string) {
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
  

}
