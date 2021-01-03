import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, length: number): string {
    const biggestWord = 50;
    const elipses = "...";

    if(typeof value === "undefined" || value === null) 
      return value;

    if(value.length <= length) 
      return value;
    
    return value.substring(0, length - elipses.length) + elipses; 

  }

}
