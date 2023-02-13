import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/core/models/Course';

export const getCoursesAction = createAction(
    '[Courses] Get All'
);

export const searchCoursesAction = createAction(
    '[Courses] Get Searched Courses',
    props<{ input: string }>()
);

export const coursesLoadedSuccess = createAction(
    '[Courses] Courses Load Success',
    props<{ payload: Course[] }>()
);

export const coursesLoadedFail = createAction(
    '[Courses] Courses Load Fail',
    props<{ error: Error }>()
);

export const addCourseAction = createAction(
    '[Courses] Add Course',
    props<{ newCourse: Course }>()
);

export const updateCourseAction = createAction(
    '[Courses] Update Course',
    props<{ updatedCourse: Course }>()
);
