import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UNIVERSAL_LOCAL_STORAGE } from '@ng-web-apis/universal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerStateInterceptor } from './core/interceptors/serverstate.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
  providers: [UNIVERSAL_LOCAL_STORAGE,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true
    }
  ]
})
export class AppServerModule { }
