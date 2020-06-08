import { Pipe, PipeTransform } from '@angular/core';
import { Empresa } from '../interfaces/empresa';

@Pipe({
  name: 'arrayFilters'
})
export class ArrayFiltersPipe implements PipeTransform {

  transform(args: any[], value: any): any {
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
debugger;
      return args.filter(item => item.idSector == value);
  }
}
