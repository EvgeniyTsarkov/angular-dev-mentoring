import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { SearchService } from 'src/app/core/services/searchService';
import { CoursesService } from 'src/app/courses/courses-service';
import {
    addCourseAction,
    coursesLoadedFail,
    coursesLoadedSuccess,
    getCoursesAction,
    searchCoursesAction,
    updateCourseAction
} from '../actions/course.actions';

@Injectable()
export class CoursesEffects {
    public loadCourses$ = createEffect(() => this.actions$.pipe(
        ofType(getCoursesAction),
        mergeMap(() => this.coursesService.getAll()
            .pipe(
                map(courses => coursesLoadedSuccess({ payload: courses })),
                catchError((error) => of(coursesLoadedFail({ error })))
            )
        )
    ));

    public searchedCourses$ = createEffect(() => this.actions$.pipe(
        ofType(searchCoursesAction),
        mergeMap((payload) => this.searchService.getSearchedCourses(payload.input)
            .pipe(
                map(courses => coursesLoadedSuccess({ payload: courses })),
                catchError((error) => of(coursesLoadedFail({ error })))
            )
        )
    ));

    public addCourse$ = createEffect(() => this.actions$.pipe(
        ofType(addCourseAction),
        mergeMap(async (payload) => this.coursesService.create(payload.newCourse)),
        tap(() => this.router.navigateByUrl('/courses'))
    ),
        { dispatch: false }
    );

    public updateCourse$ = createEffect(() => this.actions$.pipe(
        ofType(updateCourseAction),
        mergeMap(async (payload) => this.coursesService.update(payload.updatedCourse)),
        tap(() => this.router.navigateByUrl('/courses'))
    ),
        { dispatch: false }
    );

    public constructor(
        private readonly actions$: Actions,
        private readonly coursesService: CoursesService,
        private readonly searchService: SearchService,
        private readonly router: Router
    ) {
    }
}
