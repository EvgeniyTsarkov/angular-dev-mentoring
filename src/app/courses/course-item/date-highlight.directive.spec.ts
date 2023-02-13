import { UpperCasePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseItemComponent } from './course-item.component';
import { DateHighlightDirective } from './date-highlight.directive';
import { FormatDurationPipe } from './format-duration.pipe';

const containerLocator = '.container';
const outlineColorField = 'outlineColor';

describe('DateHighlightDirective', () => {
  it('should set course item border to blue if creation date is later than current day', () => {
    TestBed.configureTestingModule({
      declarations: [DateHighlightDirective, CourseItemComponent, FormatDurationPipe],
      providers: [UpperCasePipe]
    }).compileComponents();

    const fixture = TestBed.createComponent(CourseItemComponent);
    const component = fixture.debugElement.componentInstance;

    const nativeElement = fixture.debugElement.query(By.css(containerLocator));

    component.listItem = {
      id: 1,
      title: 'Test',
      duration: 88,
      description: 'Test item',
      creationDate: new Date('11/5/2070'),
    };

    fixture.detectChanges();

    const outlineColorStyle = nativeElement.styles[outlineColorField];

    expect(outlineColorStyle).toBe('blue');
  });

  it('should set course item border to white if creation date is earlier than current day', () => {
    TestBed.configureTestingModule({
      declarations: [DateHighlightDirective, CourseItemComponent, FormatDurationPipe],
      providers: [UpperCasePipe]
    }).compileComponents();

    const fixture = TestBed.createComponent(CourseItemComponent);
    const component = fixture.debugElement.componentInstance;

    const nativeElement = fixture.debugElement.query(By.css(containerLocator));

    component.listItem = {
      id: 1,
      title: 'Test',
      duration: 88,
      description: 'Test item',
      creationDate: new Date('1/1/1800'),
    };

    fixture.detectChanges();

    const outlineColorStyle = nativeElement.styles[outlineColorField];

    expect(outlineColorStyle).toBe('white');
  });

  it('should set course item border to green if creation date less than 15 days earlier than current day', () => {
    TestBed.configureTestingModule({
      declarations: [DateHighlightDirective, CourseItemComponent, FormatDurationPipe],
      providers: [UpperCasePipe]
    }).compileComponents();

    const fixture = TestBed.createComponent(CourseItemComponent);
    const component = fixture.debugElement.componentInstance;

    const nativeElement = fixture.debugElement.query(By.css(containerLocator));

    component.listItem = {
      id: 1,
      title: 'Test',
      duration: 88,
      description: 'Test item',
      creationDate: new Date(),
    };

    fixture.detectChanges();

    const outlineColorStyle = nativeElement.styles[outlineColorField];

    expect(outlineColorStyle).toBe('green');
  });


  it('should create an instance', () => {
    TestBed.configureTestingModule({
      declarations: [DateHighlightDirective, CourseItemComponent, FormatDurationPipe],
      providers: [UpperCasePipe]
    }).compileComponents();

    const fixture = TestBed.createComponent(CourseItemComponent);
    const dateHightlightDirective = fixture.debugElement.query(By.directive(DateHighlightDirective));
    expect(dateHightlightDirective).toBeTruthy();
  });
});
