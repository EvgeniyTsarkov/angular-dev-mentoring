import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Course } from '../models/Course';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private readonly coursesBaseUrl = 'http://localhost:3004/courses/';

    public constructor(private readonly http: HttpClient) {
    }

    public getAll(): Observable<Course[]> {
        return this.http.get<Course[]>(this.coursesBaseUrl);
    }

    public getById<Course>(id: number): Observable<Course> {
        const getByIdUrl = `${this.coursesBaseUrl}${id}`;
        return this.http.get<Course>(getByIdUrl)
            .pipe(map(item => item));
    }

    public create(newCourse: Course): void {
        this.http.post(this.coursesBaseUrl, newCourse)
            .subscribe((res) => console.log(res));
    }

    public update(updatedCourse: Course): void {
        const updateCourseUrl = `${this.coursesBaseUrl}${updatedCourse.id}`;
        this.http.put(updateCourseUrl, updatedCourse)
            .subscribe((res) => console.log(res));
    }

    public delete(id: number): void {
        const deleteCourseUrl = `${this.coursesBaseUrl}${id}`;
        this.http.delete(deleteCourseUrl)
            .subscribe((res) => console.log(res));
    }
}
