import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diccionario'
})
export class DiccionarioPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if (value == null || args == null || args[0] == null){
      return "";
    }
    
    let diccionario = args[0];

    let valor = diccionario.find(x => x.id == value);
    if (valor == null)
      return "";

    return valor.text;
  }

}
