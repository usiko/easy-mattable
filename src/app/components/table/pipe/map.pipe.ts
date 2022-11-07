
import { Pipe, PipeTransform, TemplateRef } from '@angular/core';





@Pipe({ name: 'map' })
export class MapPipe implements PipeTransform {
  transform(data: any[], key: string) {

    return data.map(item => item[key]);
  }
}


