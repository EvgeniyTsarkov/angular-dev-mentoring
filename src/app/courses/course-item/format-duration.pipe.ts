import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  public transform(durationValue: number,): string {
    if (durationValue < 60) {
      return `${durationValue} min`;
    }

    return `${Math.floor(durationValue / 60)}h ${durationValue % 60} min`;
  }
}
