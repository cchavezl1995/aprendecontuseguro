import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateTimeFormat'
})

export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let datePipeEs = new DatePipe('es-CO');

    return datePipeEs.transform(value, 'dd-MM-yyyy');
  }
}
