import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], text: string, property: string): any[] {
    return text === ''
      ? value
      : value.filter((item) =>
        item[property]?.toLowerCase()?.includes(text?.toLowerCase())
      );
  }
}
