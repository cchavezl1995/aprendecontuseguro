import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { LoginService } from "../../services/login.service";
import jspdf from 'jspdf';
import { LogsService } from 'src/app/services/logs/logs.service';
import { registerLocaleData } from '@angular/common';
import { color } from 'html2canvas/dist/types/css/types/color';
import { nonWhiteSpace } from 'html2canvas/dist/types/css/syntax/parser';
import jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-economy-study',
  templateUrl: './economy-study.component.html',
  styleUrls: ['./economy-study.component.scss']
})
export class EconomyStudyComponent implements OnInit {
  

  comparativo: boolean;
  ahorro: boolean;
  compuesto: boolean = false;

  ejercicio1: boolean;
  ejercicio2: boolean;
  solve1: boolean = false;
  solve2: boolean = false;
  solveAcumulado: boolean = false;

  interes = [
    2.0,
    2.1,
    2.2,
    2.3,
    2.4,
    2.5,
    2.6,
    2.7,
    2.8,
    2.9,
    3.0
  ]
  edades = [
    19,25,31,35,40,45,50
  ]
  
  selPlazo = 12;
  selValor;
  selInteres = 2;
  selArticulo = '';
  selPlazoTxt = 12;
  selValorTxt;
  selInteresTxT = 2;
  selArticuloTxt = '';

  selAhorroMensual = 0;
  selAhorroAnual = 0;
  selEdad = 19;
  selTasaInteres = 10;
  tablaAhorros = [];

  selAhorroInversion = 0;
  selAhorroInversionTxt = 0;
  resultado3: boolean = false;

  constructor(public login: LoginService, public log: LogsService, private route: ActivatedRoute) { }
  pagina: number;
  ngOnInit() {
    this.pagina = 0;
    window.scroll(0,0);

    let number = 0;
    this.route.paramMap.subscribe(
      res => {
        number = res['params']['id'];
      }
    )
    
    this.pagina = number?number:0;
    if(this.route.snapshot.queryParamMap.get('p')!=null){
      this.pagina = parseInt(this.route.snapshot.queryParamMap.get('p'));    
    }
  }
  startHomeCursos(){
    this.pagina = 1;
  }
  startDetailCursos(){
    this.pagina = 2;
  }

  goPage(){
    document.getElementById("product-comments-tab").click();
    this.seeExercises();
  }

  goModule(module){    
    if (module == 'comparativo') {
      this.comparativo = true;        
    } else if(module == 'ahorro'){
      this.ahorro = true;      
    } else if(module == 'compuesto'){
      this.compuesto = true;        
    }
  }

  goExercise(exr){    
    if (exr == 1) {
      this.ejercicio1 = true;        
    } else if(exr == 2){
      this.ejercicio2 = true;      
    }
  }

  seeExercises(){
    this.comparativo = false;
    this.ahorro = false;
    this.compuesto = false;
    this.seeTest();
  }

  seeTest(){
    this.ejercicio1 = false;
    this.ejercicio2 = false;
  }

  calcularEjercicio1(){
    this.solve1 = true;
    if(this.selValorTxt==''){
      this.selValorTxt=0;
    }
    this.selPlazo=this.selPlazoTxt;
    this.selInteres=this.selInteresTxT;
    this.selValor=this.selValorTxt;
    this.selArticulo=this.selArticuloTxt;
    var json: any = {
      'Plazo':this.selPlazoTxt,'Interes':this.selInteresTxT,'Valor':this.selValorTxt,'Articulo':this.selArticuloTxt
    }
    if(this.selPlazo>0 && this.selInteres>0 && this.selValorTxt!='' && this.selArticulo!='' ){
      this.log.addLog('Cursos Financieros','Ejercicio: Ejercicio comparativo entre ahorro y deuda',JSON.stringify(json));
    }
    
  }

  elevar(valor: any, exp: any){
    return Math.pow(valor,exp);
  }
  calcularAcumulado(){
    this.solveAcumulado = true;
    let aux = 0;
    this.selAhorroAnual = this.selAhorroMensual*12;
    aux = this.selAhorroAnual*(1+(this.selTasaInteres/100));
    aux = Math.round(aux);
    this.tablaAhorros = [];
    this.tablaAhorros.push(new Intl.NumberFormat("es-CO").format(aux));
    for(let i=this.selEdad;i<=64;i++){
      aux = (aux + this.selAhorroAnual)*(1+(this.selTasaInteres/100))
      aux = Math.round(aux);
      this.tablaAhorros.push(new Intl.NumberFormat("es-CO").format(aux));
    }
    var json: any = {
      'AhorroMensual':this.selAhorroMensual,'AhorroAnual':this.selAhorroAnual,'Edad':this.selEdad,'Interes':this.selTasaInteres
    }
    if(this.selAhorroMensual>0){
      this.log.addLog('Cursos Financieros','Ejercicio: ¡El poder de comenzar a ahorrar ya!',JSON.stringify(json));
    }
  }

  calcularInteresCompuesto(){
    this.selAhorroInversion = this.selAhorroInversionTxt
    if(this.selAhorroInversion>0){
      this.log.addLog('Cursos Financieros','Ejercicio: El interés compuesto!',this.selAhorroInversion.toString());
      this.resultado3 = true;
    }
  }

  handlePdf(element){
    let day = new Date().getDate();
    let monthAux = new Date().getMonth();
    let year = new Date().getFullYear();
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    // console.log('pdf......');
    const input = document.getElementById(element);
    window.scrollTo(0,0);
      
      var HTML_Width = $("#"+element).width();
      var HTML_Height = $("#"+element).height();
      var top_left_margin = 15;
      var PDF_Width = HTML_Width + (top_left_margin * 2);
      var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;
  
      var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
  
      html2canvas($("#"+element)[0]).then(function (canvas) {
          var imgData = canvas.toDataURL("image/jpeg", 1.0);
          var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
          pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
          for (var i = 1; i <= totalPDFPages; i++) { 
              pdf.addPage(PDF_Width, PDF_Height);
              pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
          }
          pdf.save(`pdf_${year}${monthAux + 1}${day}${hour}${minute}${second}.pdf`); // Generated PDF
      });
  }

}
