import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/Course';
import { CoursesEffects } from 'src/app/store/effects/courses.effects';
import { CoursesFacade } from 'src/app/store/facades/courses.facade';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
  providers: [CoursesEffects]
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  public courses$: Observable<Course[]> = this.coursesFacade.courses$;

  public searchInput = new FormControl('');

  private readonly searchInputSubscription =
    this.searchInput.valueChanges.subscribe(item => {
      if (typeof item === 'string') {
        this.coursesFacade.searchCoursesByTextFragment(item);
      }
    });

  public constructor(private readonly coursesFacade: CoursesFacade) {
  }

  public ngOnInit(): void {
    this.coursesFacade.getAllCourses();
  }

  public ngOnDestroy(): void {
    this.searchInputSubscription.unsubscribe();
  }
}
