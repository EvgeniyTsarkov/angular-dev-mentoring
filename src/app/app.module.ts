import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { LoginModule } from './login/login.module';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundModule } from './not-found/not-found.module';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { AuthenticationService } from './core/services/authenticationService';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './core/interceptors/authenticationInterceptor';
import { LoadingInterceptor } from './core/interceptors/loading-interceptor.interceptor';
import { authReducer } from './store/reducers/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/effects/courses.effects';
import { courseReducer } from './store/reducers/course.reducer';
import { SearchService } from './core/services/searchService';
import { CoursesFacade } from './store/facades/courses.facade';
import { BrowserStateInterceptor } from './core/interceptors/browserstate.interceptor';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule),
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreModule,
    CoursesModule,
    LoginModule,
    NotFoundModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    }),
    HttpClientModule,
    StoreModule.forRoot({
      auth: authReducer,
      courses: courseReducer
    }),
    EffectsModule.forRoot([CoursesEffects]),
  ],
  providers: [
    AuthenticationService,
    SearchService,
    CoursesFacade,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthenticationInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
