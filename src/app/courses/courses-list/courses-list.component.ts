import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Course } from 'src/app/core/models/Course';
import { SearchService } from 'src/app/core/services/searchService';
import { ModalService } from 'src/app/modal/modal.service';
import { CoursesService } from '../courses-service';
import { TitleFilterPipe } from './title-filter.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [
    TitleFilterPipe,
    CoursesService,
    ModalService,
    SearchService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnChanges {
  @Input()
  public listItems!: Course[];

  public paginatedItems!: Course[] | undefined;

  public coursesNumber!: number | undefined;

  private listItemId!: number;

  private readonly coursesPerPage = 10;

  private readonly coursesPerPageMinusFirstOne = 9;

  public constructor(
    private readonly cousesService: CoursesService,
    private readonly modalService: ModalService,
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['listItems']) {
      this.paginatedItems = this.getPaginatedCoursesByIndex(0);
      this.coursesNumber = this.listItems?.length;
    }
  }

  public getPaginatedCourses(pageNumber: number): void {
    this.paginatedItems = this.getPaginatedCoursesByIndex(pageNumber);
  }

  public getPaginatedCoursesByIndex(pageNumber: number): Course[] | undefined {
    const startIndex = pageNumber * this.coursesPerPage - this.coursesPerPage;
    const endIndex = startIndex + this.coursesPerPageMinusFirstOne;
    return this.listItems?.slice(startIndex, endIndex);
  }

  public openModal(courseId: number): void {
    this.listItemId = courseId;
    this.modalService.open('modal-1');
  }

  public deleteItem(): void {
    this.cousesService.delete(this.listItemId);
    this.modalService.close('modal-1');
    this.paginatedItems = this.getPaginatedCoursesByIndex(0);
  }

  public closeModal(): void {
    this.modalService.close('modal-1');
  }
}
