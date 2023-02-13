import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    public constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: Storage){
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authClone = req.clone({
            headers: req.headers.set('Authorization', this.localStorage.getItem('token') as string)
        });
        return next.handle(authClone);
    }
}
