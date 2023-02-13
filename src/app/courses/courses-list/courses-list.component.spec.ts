import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Course } from 'src/app/core/models/Course';
import { CoursesListComponent } from './courses-list.component';
import { OrderByPipe } from './order-by.pipe';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  const courseItemLocator = 'app-course-item';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        OrderByPipe
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('listItem binding should provide proper input', () => {
    const expectedItems: Course[] = [
      {
        id: 1,
        title: 'Test',
        creationDate: new Date('01/01/2001'),
        duration: 88,
        description: 'Test item',
        topRated: true
      }
    ];

    component.listItems = expectedItems;

    fixture.detectChanges();

    const courseItem = fixture.debugElement.query(By.css(courseItemLocator));

    expect(courseItem.nativeElement.listItem).toEqual(expectedItems[0]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
