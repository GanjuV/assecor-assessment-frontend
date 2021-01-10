import { Pipe, PipeTransform } from '@angular/core';

/**
 * Empty message pipe.
 * @export
 * @class EmptyValueMessagePipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'emptyValueMessage',
})
export class EmptyValueMessagePipe implements PipeTransform {
  transform(value: string | number, args?: any): string | number {
    return value && value !== '' && value !== ' ' ? value : '--';
  }
}
