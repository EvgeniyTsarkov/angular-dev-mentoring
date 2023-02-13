import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDateHighlight]'
})
export class DateHighlightDirective implements AfterViewInit {

  @Input()
  public itemCreationDate = '';

  public constructor(private readonly elementRef: ElementRef) {
  }

  public ngAfterViewInit(): void {
    this.setBorderColor();
  }

  private setBorderColor(): void {
    const creationDate = new Date(this.itemCreationDate);
    const currentDate = new Date();
    const fourteenDaysAgoDate = new Date((new Date().setDate(currentDate.getDate() - 14)));

    let borderColor;

    if (creationDate < currentDate && creationDate >= fourteenDaysAgoDate) {
      borderColor = 'green';
    } else if (creationDate > currentDate) {
      borderColor = 'blue';
    } else {
      borderColor = 'white';
    }

    this.elementRef.nativeElement.style.outlineColor = borderColor;
  }
}
