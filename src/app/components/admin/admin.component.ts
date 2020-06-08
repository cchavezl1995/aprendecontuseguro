import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DiccionarioService } from '../../services/diccionario.service';
import { NetworkingService } from "../../services/networking.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  modules = [
    {
      name: "Networking",
      module: "networking",
      text:"Establece programación de eventos estratégicos y crea alianzas para hacer exitosos emprendimientos.",
    },
    // {
    //   name: "Coworking",
    //   module: "coworking",
    //   text:"Coworking es la nueva tendencia a nivel mundial para realizar reuniones sin necesidad de tener que asumir un alquiler fijo de un sitio."
    // }
  ]

  events: any[] = [];
  loader: boolean;
  imageSrc: string;
  page: number = 0;
  form: FormGroup;
  submitted: boolean;
  ciudades: any[] = [];
  date: Date = new Date();
  currentDate: string = `${this.date.getFullYear()}-${(this.date.getMonth()+1)<10?'0'+(this.date.getMonth()+1):(this.date.getMonth()+1)}-${this.date.getDate()<10?'0'+this.date.getDate():this.date.getDate()}`;

  constructor(private diccionarioService:DiccionarioService, private netWorkingService: NetworkingService) {
    this.form = new FormGroup({
      city: new FormControl('', Validators.compose([Validators.required])),
      eventType: new FormControl('2', Validators.compose([Validators.required])),
      eventDescription: new FormControl('',Validators.compose([Validators.required])),
      talkName: new FormControl('',Validators.compose([Validators.required])),
      talkDescription: new FormControl('.',Validators.compose([Validators.required])),
      eventDate: new FormControl('', { validators: [Validators.required] }),
      eventHour: new FormControl('', Validators.compose([Validators.required])),
      eventPlace: new FormControl('', Validators.compose([Validators.required])),
      image: new FormControl('', Validators.compose([Validators.required])),
      fileName: new FormControl(''),
    });
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.getCiudad();
    this.getEvents();
  }

  increment(){
    this.page++;
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);

    if (!this.form.valid) {
      Swal.fire({
        title: 'Aviso',
        text: 'Debe diligenciar los campos obligatorios.',
        type: 'warning',
        confirmButtonText: 'Aceptar'
      });      
      return;
    }

    let form = {
      idCiudad: this.form.get('city').value,
      idTipoEvento: this.form.get('eventType').value,
      descripcionEvento: this.form.get('eventDescription').value,
      nombreConferencista: this.form.get('talkName').value,
      descripcionConferencista: this.form.get('talkDescription').value,
      fechaEvento: this.form.get('eventDate').value,
      HoraEvento: this.form.get('eventHour').value,
      lugarEvento: this.form.get('eventPlace').value,
      nombreArchivo: this.form.get('fileName').value,
      rutaImagenEvento: this.form.get('image').value,
    }

    this.netWorkingService.addEvent(form).subscribe(res => {
      if (res['codigo'] == 0) {
        Swal.fire({
          title: 'Correcto!',
          text: `El evento se ha creado correctamente.`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.getEvents();
        this.form.get('eventDescription').setValue('');
        this.form.get('talkName').setValue('');
        this.form.get('talkDescription').setValue('');
        this.form.get('eventDate').setValue('');
        this.form.get('eventHour').setValue('');
        this.form.get('eventPlace').setValue('');
        this.form.get('fileName').setValue('');
        this.form.get('image').setValue('');
        this.imageSrc = '';
        this.submitted = false;
        this.getMyStyles();
      }  
    })
  }

  delete(id){
    // console.log(id);
    this.netWorkingService.deleteEvent(id).subscribe(res => {
      if(res['codigo']==0){
        Swal.fire({
          title: 'Correcto!',
          text: `El evento se ha eliminado correctamente.`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.getEvents();
      }else{
        Swal.fire({
          title: 'Aviso',
          text: 'No fue posible eliminar evento.',
          type: 'warning',
          confirmButtonText: 'Aceptar'
        }); 
      }
    })
  }

  loadData(item){
    console.log(item);
    
  }

  getEvents(){
    this.netWorkingService.getEvents().subscribe(
      res => {
        // console.log(res); 
        this.events = res['data'];
      }
    )
  }

  getCiudad() {
    this.diccionarioService.getDiccionario(7)
      .subscribe(
        (data: any) => {
          this.ciudades = data.data;
        },
        (error: any) => console.log(error)
      );
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];      
    var pattern = /image-*/;
    var reader = new FileReader();

    this.form.get('fileName').setValue(file.name);

    if (!file.type.match(pattern)) {
      Swal.fire({
        title: 'Aviso',
        text: 'El formato del archivo no es correcto.',
        type: 'warning',
        confirmButtonText: 'Aceptar'
      });
      
      return;
    }     
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

_handleReaderLoaded(e) {
    this.loader = true;
    var reader = e.target;
    this.imageSrc = reader.result;

    this.form.get('image').setValue(this.imageSrc);

     if (this.form.get('image').value != '') {
      Swal.fire({
        title: 'Correcto!',
        text: `La imagen del evento se ha cargado.`,
        type: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.loader = false;
      return;
    }
}

  getMyStyles() {
    let myStyles;

    if (this.imageSrc != null){
      myStyles = {
        'background': 'url(' + this.imageSrc + ') no-repeat' 
      };
    }

    return myStyles;
  }  

}
