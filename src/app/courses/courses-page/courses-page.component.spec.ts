import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesPageComponent } from './courses-page.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('onClickSearchButton should be called once clicked', () => {
    const spy = spyOn(component, 'onClickSearchButton');

    fixture.debugElement.query(By.css('.search-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('onClickSearchButton should set searchInput value', () => {
    const expectedValue = 'test value';
    component.inputValue = expectedValue;

    component.onClickSearchButton();

    expect(component.searchInput).toBe(expectedValue);
  });

  it('onAddCourseButtonClick should be called once clicked', () => {
    const spy = spyOn(component, 'onAddCourseButtonClick');

    fixture.debugElement.query(By.css('.add-course-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('onAddCourseButtonClick function should log message', () => {
    const consoleSpy = spyOn(console, 'log');
    component.onAddCourseButtonClick();

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('onLoadMoreButtonClick should be called once clicked', () => {
    const spy = spyOn(component, 'onLoadMoreButtonClick');

    fixture.debugElement.query(By.css('.load-more-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('onLoadMoreButtonClick function should log message', () => {
    const consoleSpy = spyOn(console, 'log');
    component.onLoadMoreButtonClick();

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('setInputValue should be called once input text is placed', () => {
    const spy = spyOn(component, 'setInputValue');

    fixture.debugElement.query(By.css('#text-input')).triggerEventHandler('input', 'test text');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
