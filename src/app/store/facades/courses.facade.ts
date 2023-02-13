import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Course } from 'src/app/core/models/Course';
import {
    addCourseAction,
    getCoursesAction,
    searchCoursesAction,
    updateCourseAction
} from '../actions/course.actions';
import { CourseState } from '../reducers/course.reducer';
import { selectCourses } from '../selectors/courses.selector';

@Injectable()
export class CoursesFacade {
    public courses$: Observable<Course[]> = this.store.select(selectCourses);

    public constructor(private readonly store: Store<{ courses: CourseState }>) {
    }

    public getAllCourses(): void {
        this.store.dispatch(getCoursesAction());
    }

    public searchCoursesByTextFragment(inputValue: string): void {
        this.store.dispatch(searchCoursesAction({ input: inputValue }));
    }

    public createCourse(newCourse: Course): void {
        this.store.dispatch(addCourseAction({ newCourse }));
    }

    public updateCourse(updatedCourse: Course): void {
        this.store.dispatch(updateCourseAction({ updatedCourse }));
    }
}
