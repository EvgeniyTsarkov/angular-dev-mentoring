import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/models/Course';
import { CoursesService } from '../courses-service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input()
  public listItem!: Course;

  @Output()
  public deleteClicked = new EventEmitter<number>();

  public constructor(private readonly router: Router,
    private readonly coursesService: CoursesService){
  }

  public onDeleteButtonClick(): void {
    const courseId = this.listItem.id;
    this.deleteClicked.emit(courseId);
  }

  public onEditButtonClick(): void {
    this.router.navigate([`./courses/${this.listItem.id}`]);
  }
}
