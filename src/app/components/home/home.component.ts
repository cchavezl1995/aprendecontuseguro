import { Component, OnInit, SimpleChanges } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';
import { DiccionarioService } from 'src/app/services/diccionario.service';
import { Diccionario } from 'src/app/interfaces/diccionario';
import { URL } from "../../config/variables";
import { count } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LogsService } from 'src/app/services/logs/logs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  api: string = URL;
  actualSlide: number = 0;
  idTipoDocumento: number = 5;
  slideInterval;
  isShown: boolean = true;
  tiposDocumento: Diccionario[];
  url: string;
  doc: string;
  modalHomeEco: number = 0;
  pause: boolean = true;
  pauso: boolean = true;
  public innerWidth: any;
  constructor(public login: LoginService, private cookieService: CookieService, private diccionario: DiccionarioService, private logs:LogsService) {
    // if(this.header.cobertura == 'Desempleo')
    // {
    //   $('#vert-tabs-home-tab-d').click();
    // }
    // if(this.header.cobertura == 'Itt')
    // {
    //   $('#vert-tabs-home-tab-i').click();
    // }
    // if(this.header.cobertura == 'Fraude')
    // {
    //   $('#vert-tabs-home-tab-f').click();
    // }
    // console.log(this.login.cobertura);


  }

  //  ngOnChanges(changes: SimpleChanges): void {
  //    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //    //Add '${implements OnChanges}' to the class.
  //    window.location.reload();     
  //  }
  AddLog(pagina: string, control: string, extra?: string){
    if(this.login.isActive()){
      this.logs.addLog(pagina,control,extra);
    }
  }
  
  ngOnInit(): void {
    // window.location.reload();
    window.scroll(0, 0);
    const cookieExists: boolean = this.cookieService.check('primeraSesion');
    const coockies: boolean = this.cookieService.check('coockies');
    if (coockies) {
      this.isShown = false;
    }
    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth);
    if (this.login.isActive() && this.innerWidth > 992) {
      this.cookieService.set('primeraSesion', 'Activo');
      this.cookieValue = this.cookieService.get('primeraSesion');
    }
    let counter: number = 0;
    if (!cookieExists && this.login.isActive() && this.innerWidth > 992) {
      $('.modalInicio').click();
    }
    this.getTiposDoc();
    this.slideInterval = setInterval(function () {
      let s = document.querySelectorAll('.slideAutomatico');
      // console.log(s.length);
      $("#hiddenSlide").val(parseInt($("#hiddenSlide").val().toString()) + 1);
      if (parseInt($("#hiddenSlide").val().toString()) > s.length - 1) {
        $("#hiddenSlide").val(0);
      }
      let i = parseInt($("#hiddenSlide").val().toString());
      let h = document.querySelectorAll('.slideAutomatico')[i] as HTMLElement;
      $(".slideAutomatico").removeClass("active");

      $(".slideAutomatico").eq(i).addClass("active");
      $(".carrusel").first().carousel(i);
    }, 7500);
  }

  ngOnDestroy() {
    clearInterval(this.slideInterval);
  }

  setSlide(i) {
    $("#hiddenSlide").val(i);
    $(".slideAutomatico").removeClass("active");
    $(".slideAutomatico").eq(i).addClass("active");
    clearInterval(this.slideInterval);
    if (this.pause == true) {
      this.slideInterval = setInterval(function () {
        let s = document.querySelectorAll('.slideAutomatico');
        // console.log(s.length);
        $("#hiddenSlide").val(parseInt($("#hiddenSlide").val().toString()) + 1);
        if (parseInt($("#hiddenSlide").val().toString()) > s.length - 1) {
          $("#hiddenSlide").val(0);
        }
        let i = parseInt($("#hiddenSlide").val().toString());
        let h = document.querySelectorAll('.slideAutomatico')[i] as HTMLElement;
        $(".slideAutomatico").removeClass("active");

        $(".slideAutomatico").eq(i).addClass("active");
        $(".carrusel").first().carousel(i);
      }, 7500);
    } else {
      clearInterval(this.slideInterval);
    }
  }
  pauseSlide() {
    this.pause = false;
    clearInterval(this.slideInterval);
  }
  playSlide() {
    this.pause = true;
    this.slideInterval = setInterval(function () {
      let s = document.querySelectorAll('.slideAutomatico');
      // console.log(s.length);
      $("#hiddenSlide").val(parseInt($("#hiddenSlide").val().toString()) + 1);
      if (parseInt($("#hiddenSlide").val().toString()) > s.length - 1) {
        $("#hiddenSlide").val(0);
      }
      let i = parseInt($("#hiddenSlide").val().toString());

      $(".slideAutomatico").removeClass("active");

      $(".slideAutomatico").eq(i).addClass("active");
      $(".carrusel").first().carousel(i);
    }, 7500);
  }

  stopVideo() {
    var vidsrc_frame = $('iframe');
    var vidsrc_src = $('iframe').attr('src');
    // console.log(`videosrc=` + vidsrc_src);
    vidsrc_frame.attr('src', '');
    vidsrc_frame.attr('src', vidsrc_src);
  }

  cerrarCoockie() {
    // console.log("entra");
    this.isShown = !this.isShown;
    this.cookieService.set('coockies', 'Acepta');
  }
  // Cargar tipos de documento
  getTiposDoc() {
    this.diccionario.getDiccionario(1)
      .subscribe(
        (data: any) => { //start of (1)
          this.tiposDocumento = data.data;
          // console.log(this.tiposDocumento);
        }, //end of (1)
        (error: any) => { console.log(error) }
      );
  }
  registrarse() {
    // console.log(this.idTipoDocumento.toString());
    if (this.idTipoDocumento.toString() == '' || (this.doc == '' || this.doc == undefined)) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Debes diligenciar los datos para ingresar',
        type: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    } 
    this.url = "/registro/2?idT=" + this.idTipoDocumento.toString() + "&doc=" + this.doc
    window.open(this.url, "_self");
  }
  onNavigate() {
    this.url = "https://www.coursera.org/programs/kg16p?attemptSSOLogin=true&authMode=login&authProvider=scotiabank"
    window.open(this.url, "_blank");
  }

}