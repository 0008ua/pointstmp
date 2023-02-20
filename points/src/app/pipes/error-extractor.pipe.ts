import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorExtractor',
})
export class ErrorExtractorPipe implements PipeTransform {
  transform(value: object, ...args: unknown[]): Array<string> {
    const keys = [];
    if (typeof value === 'object') {
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          keys.push(key);
        }
      }
    }
    return keys;
  }
}
