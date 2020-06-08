import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/services/logs/logs.service';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  pregunta: string;
  jsonPreguntas: any = {};
  jsonPreguntasFiltro: any = {};
  listaPregunta: boolean = false;
  constructor(private logs:LogsService,public login: LoginService) { }

  AddLog(pagina: string, control: string, extra?: string){
    if(this.login.isActive()){
      this.logs.addLog(pagina,control,extra);
    }
  }

  ngOnInit() {
    window.scroll(0,0);
    this.jsonPreguntas = 
      [{
        "idCategoria": "1",
        "Pregunta": "¿Cómo puedo disfrutar de los servicios de mi seguro?",
        "Respuesta": "Usarlos es muy fácil. Solo debes tener un seguro activo y listo. Te registras con tus datos personales y puedes usar los servicios desde donde quieras y como quieras."
      },{
        "idCategoria": "1",
        "Pregunta": "¿Tienen un costo adicional los servicios que incluye el seguro?",
        "Respuesta": "No, todos están incluidos dentro del costo de tu seguro."
      },{
        "idCategoria": "2",
        "Pregunta": "¿Qué debo hacer para adquirir un seguro? ",
        "Respuesta": "Scotiabank tiene a tu servicio diferentes canales de atención. Contáctanos ahora y recibe más información."
      },
      {
        "idCategoria": "3",
        "Pregunta": "¿Los servicios de Contáctate con tu seguro tienen algún costo adicional al seguro?",
        "Respuesta": "No, Contáctate con tu seguro te brinda beneficios adicionales a la cobertura de tu seguro sin costo adicional."
      },{
        "idCategoria": "3",
        "Pregunta": "¿Los servicios tienen algún límite de uso?",
        "Respuesta": "Tienes disponibles todos los servicios a la mano, para que los uses a tu manera, cuando quieras y desde dónde te encuentres sin ningún límite.<br>* <i>En el caso de Coursera tienes habilitado 1 curso de todo el portafolio abierto a cualquier universidad del mundo, cada año. Ten en cuenta que un curso puede tomar hasta 5 meses dependiendo del tiempo que le dediques.</i>"
      },{
        "idCategoria": "4",
        "Pregunta": "¿Si no cuento con un seguro, cómo puedo adquirirlo?",
        "Respuesta": "Acércate a cualquiera de nuestras oficinas Scotiabank en todo el país y pregunta por el seguro que más se ajuste a tus necesidades."
      },{
        "idCategoria": "4",
        "Pregunta": "¿Acabas de adquirir un seguro?",
        "Respuesta": "Es posible que estemos personalizando tus servicios, te recomendamos ingresar nuevamente en los próximos 3 días hábiles a partir de la fecha de compra del seguro, o acércate a cualquiera de las sucursales Scotiabank a nivel nacional."
      }
    ]
    this.jsonPreguntasFiltro = this.jsonPreguntas;
  }
  muestraListado(){
    this.listaPregunta=true;
  }
  ocultaListado(){
    this.delay(200);
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>
    this.listaPregunta=false);
  }
  colocarPregunta(pregunta){
    this.pregunta=pregunta;
  }
  buscarPregunta(idCategoria){
    this.jsonPreguntasFiltro = this.jsonPreguntas;
    if(idCategoria==0){
      if(this.pregunta==''){
        this.jsonPreguntasFiltro = this.jsonPreguntas;
      }else{
        this.jsonPreguntasFiltro = this.jsonPreguntas.filter(x => x["Pregunta"]==this.pregunta);
      }
    }else{
        this.jsonPreguntasFiltro = this.jsonPreguntas.filter(x => x["idCategoria"]==idCategoria);
    }
  }
}
