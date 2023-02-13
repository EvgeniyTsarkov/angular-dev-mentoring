import { Course } from 'src/app/core/models/Course';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {

  it('course items should be sorted according to creation dates', () => {
    const testItems: Course[] = [
      {
        id: 1,
        title: 'Test',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/2070')
      },
      {
        id: 2,
        title: 'Test',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/1970')
      },
      {
        id: 3,
        title: 'Test',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/2020')
      }
    ];

    const expectedItems = [
      {
        id: 2,
        title: 'Test',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/1970')
      },
      {
        id: 3,
        title: 'Test',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/2020')
      },
      {
        id: 1,
        title: 'Test',
        duration: 88,
        description: 'Test test',
        creationDate: new Date('12/5/2070')
      },
    ];

    const orderByPipe = new OrderByPipe();

    const actualItems = orderByPipe.transform(testItems);

    expect(actualItems).toEqual(expectedItems);
  });

  it('create an instance', () => {
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });
});
