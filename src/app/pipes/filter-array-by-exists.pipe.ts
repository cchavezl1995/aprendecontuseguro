import { Pipe, PipeTransform } from '@angular/core';
import { Diccionario } from '../interfaces/diccionario';

@Pipe({
  name: 'filterArrayByExists'
})
export class FilterArrayByExistsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    let retorno:Diccionario[] = [];

    let todo:Diccionario = {
      id: '0',
      text: 'Todos'
    }

    retorno.push(todo);

    args[0].filter(res => {
      if (retorno.filter(x => x.id == res[value]).length == 0){
          retorno.push(args[1].find(y => y.id == res[value]));
      }
    });

    return retorno;
  }
}
