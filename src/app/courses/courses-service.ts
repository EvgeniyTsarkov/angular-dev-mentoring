import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/Course';
import { HttpService } from '../core/services/httpService';

@Injectable()
export class CoursesService {
    public constructor(private readonly httpService: HttpService) {
    }

    public getAll(): Observable<Course[]> {
        return this.httpService.getAll();
    }

    public getById<Course>(id: number): Observable<Course> {
        return this.httpService.getById(id);
    }

    public create(newCourse: Course): void {
        this.httpService.create(newCourse);
    }

    public update(updatedCourse: Course): void {
        this.httpService.update(updatedCourse);
    }

    public delete(id: number): void {
        this.httpService.delete(id);
    }
}
