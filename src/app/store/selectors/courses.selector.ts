import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from '../reducers/course.reducer';

export const selectCoursesState = createFeatureSelector<CourseState>('courses');

export const selectCourses = createSelector(
    selectCoursesState,
    (state: CourseState) => state.courses
);
