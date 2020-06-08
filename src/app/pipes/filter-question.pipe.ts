import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterQuestion'
})
export class FilterQuestionPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    // Remove the duplicate elements
    let uniqueArray: any[] = [];

    value.filter(res => {
      if (res['numeroPagina']==args[0]) {
        uniqueArray.push(res);
      }
    })
    // console.log(uniqueArray);
    return uniqueArray;
  }

}
