import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Course } from '../models/Course';

@Injectable()
export class SearchService {
    public constructor(private readonly http: HttpClient) { }

    public getSearchedCourses(searchText: string): Observable<Course[]> {
        const requesrUrl = `http://localhost:3004/courses?textFragment=${searchText}&sort=date`;
        return this.http.get<Course[]>(requesrUrl);
    }
}
