import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import * as memoryCache from 'memory-cache';
import { of } from 'rxjs';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {
    private readonly timeout = 1000 * 60;
    private readonly successStatus = 200;

    public constructor(
        private readonly transferState: TransferState,
        private readonly ngZone: NgZone
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const cachedData = memoryCache.get(req.url);
        if (cachedData) {
            this.transferState.set(makeStateKey(req.url), cachedData);
            return of(new HttpResponse({ body: cachedData, status: this.successStatus }));
        }

        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.transferState.set(makeStateKey(req.url), event.body);
                    this.ngZone.runOutsideAngular(() => {
                        memoryCache.put(req.url, event.body, this.timeout);
                    });
                }
            })
        );
    }
}
