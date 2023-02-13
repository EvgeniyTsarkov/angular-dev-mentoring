import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Course } from 'src/app/core/models/Course';
import { addCourseAction, coursesLoadedFail, coursesLoadedSuccess, updateCourseAction } from '../actions/course.actions';


export interface CourseState {
    courses: Course[];
}

export const initialState: CourseState = {
    courses: []
};



export const courseReducer = createReducer(
    initialState,
    on(coursesLoadedSuccess, (state, { payload }) => state = { courses: payload }),
    on(coursesLoadedFail, (state, { error }) => {
        state = { courses: [] };
        console.log(`Error: ${error.message}`);
        return state;
    }),
    on(addCourseAction, (state, { newCourse }) => state = { courses: [...state.courses, newCourse] }),
    on(updateCourseAction, (state, { updatedCourse }) => {
        const intermediateArray = state.courses.slice();
        const courseIndex = intermediateArray.findIndex(course => course.id === updatedCourse.id);
        intermediateArray[courseIndex] = updatedCourse;
        state = { courses: intermediateArray };
        return state;
    })
);
