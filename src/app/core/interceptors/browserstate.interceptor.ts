import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BrowserStateInterceptor implements HttpInterceptor {

    private readonly expectedMethod = 'GET';
    private readonly successStatus = 200;

    public constructor(private readonly transferState: TransferState) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method !== this.expectedMethod) {
            return next.handle(req);
        }

        const storedResponse: string | null = this.transferState.get(makeStateKey(req.url), null);

        if (storedResponse) {
            const response = new HttpResponse({ body: storedResponse, status: this.successStatus });
            return of(response);
        }

        return next.handle(req);
    }
}
