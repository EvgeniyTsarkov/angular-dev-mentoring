import { Course } from 'src/app/core/models/Course';
import { TitleFilterPipe } from './title-filter.pipe';

describe('FilterPipePipe', () => {

  it('items should be filtered by title', () => {
    const testItems: Course[] = [
      {
        id: 1,
        title: 'Frontend development',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/2070')
      },
      {
        id: 2,
        title: 'Backend development',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/1970')
      },
      {
        id: 3,
        title: 'Quality assurance',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/2020')
      }
    ];

    const titleFilter = new TitleFilterPipe();

    const expectedItems: Course[] = [
      {
        id: 1,
        title: 'Frontend development',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/2070')
      },
      {
        id: 2,
        title: 'Backend development',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/1970')
      }
    ];

    const actualItems = titleFilter.transform(testItems, 'dev');

    expect(actualItems.length).toBe(2);
    expect(actualItems).toEqual(expectedItems);
  });

  it('create an instance', () => {
    const pipe = new TitleFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
