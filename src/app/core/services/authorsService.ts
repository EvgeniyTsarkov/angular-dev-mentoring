import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DbAuthor } from '../models/DbAuthor';

@Injectable()
export class AuthorsService {

    public constructor(private readonly http: HttpClient) {
    }

    public getAll(): Observable<DbAuthor[]> {
        return this.http.get<DbAuthor[]>('http://localhost:3004/authors');
    }
}
