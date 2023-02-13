import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/core/models/Course';

@Pipe({
  name: 'filterPipe'
})
export class TitleFilterPipe implements PipeTransform {
  public transform(listItems: Course[], searchInput: string): Course[] {
    if (searchInput === '') {
      return listItems;
    }

    return listItems.filter(item =>
      item.name.toLowerCase().includes(searchInput.toLowerCase()));
  }
}
