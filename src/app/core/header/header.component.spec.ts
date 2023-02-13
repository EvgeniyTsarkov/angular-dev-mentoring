import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('onLogoffButtonClick should be called once clicked', () => {
    const spy = spyOn(component, 'onLogoffButtonClick');

    fixture.debugElement.query(By.css('.logoff-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('onLogoffButtonClick function should log message', () => {
    const consoleSpy = spyOn(console, 'log');
    component.onLogoffButtonClick();

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
