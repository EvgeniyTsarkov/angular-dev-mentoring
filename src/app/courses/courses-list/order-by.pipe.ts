import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/core/models/Course';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  public transform(listItemArray: Course[]): Course[] {
    return listItemArray.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
    });
  }
}
