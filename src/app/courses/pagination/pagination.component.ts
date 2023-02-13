import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Output()
  public pageNumberClicked = new EventEmitter<number>();

  @Input() public coursesNumber!: number | undefined;
  public pages: number[] = [];

  private readonly coursesPerPage = 10;

  public ngOnChanges(): void {
    this.pages.length = 0;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (let i = 0; i < this.coursesNumber! / this.coursesPerPage; i++) {
      this.pages.push(i + 1);
    }
  }

  public onPageNumberClick(pageNumber: number): void {
    this.pageNumberClicked.emit(pageNumber);
  }
}
