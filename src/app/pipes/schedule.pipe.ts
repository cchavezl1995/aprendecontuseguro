import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'schedule'
})
export class SchedulePipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    // console.log('entrando al pipe!...');
    // console.log(args[0]);
    // console.log(value);

    let uniqueArray: any[] = [];
    const currentDate = new Date();

    value.filter(res => {        
      args[0].forEach(item => {        
        if (res['idAgendaTipo'] == item['idAgendaTipo']) {
          // console.log('currentDate ',currentDate);          
          // console.log(new Date(res['fechaAgenda']));
          if (new Date(res['fechaAgenda']) > currentDate) {
            uniqueArray.push(res);            
          }
          
        }
      });
    })
    // console.log(uniqueArray);
    return uniqueArray;    
  }

}
