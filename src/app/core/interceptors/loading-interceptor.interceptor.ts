import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loadingService';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  public constructor(private readonly leadingService: LoadingService) {
  }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.leadingService.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.leadingService.hide();
      })
    );
  }
}
