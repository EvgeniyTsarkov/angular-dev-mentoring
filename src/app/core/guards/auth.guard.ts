import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild,
  Router, RouterStateSnapshot, UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authenticationService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  public constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      return of(true);
    }

    const loginPageUrl = this.router.parseUrl('/login');

    return of(this.authService.isAuthenticated() ? true : loginPageUrl);
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
