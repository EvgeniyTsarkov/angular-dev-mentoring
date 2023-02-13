import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseItemComponent } from './course-item.component';
import { FormatDurationPipe } from './format-duration.pipe';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  const testDateValue = '05/05/2003';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent,
        FormatDurationPipe
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;

    component.listItem = {
      id: 22,
      title: 'Test',
      creationDate: new Date(testDateValue),
      duration: 200,
      description: 'Test data'
    };

    fixture.detectChanges();
  });

  it('deliteClicked should emit proper event', () => {
    component.deleteClicked.subscribe((courseId: number) => {
      expect(courseId).toBe(22);
    });

    component.onDeleteButtonClick();
  });

  it('deliteClicked should emit proper value', () => {
    const spy = spyOn(component.deleteClicked, 'emit');

    component.onDeleteButtonClick();

    expect(spy).toHaveBeenCalledWith(22);
  });

  it('onDeleteButtonClick should be called once clicked', () => {
    const spy = spyOn(component, 'onDeleteButtonClick');

    fixture.debugElement.query(By.css('.delete-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('onEditButtonClick should be called once clicked', () => {
    const spy = spyOn(component, 'onEditButtonClick');

    fixture.debugElement.query(By.css('.edit-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('onEditButtonClick function should log message', () => {
    const consoleSpy = spyOn(console, 'log');
    component.onEditButtonClick();

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
