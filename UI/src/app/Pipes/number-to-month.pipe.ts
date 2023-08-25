import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToMonth'
})
export class NumberToMonthPipe implements PipeTransform {

  months: string[]=[
    'january',
    'februrary',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];
  transform(value: string): string {
    return parseInt(value)>0 && parseInt(value)<13
    ? this.months[parseInt(value) - 1]
    :'';
  }

}
