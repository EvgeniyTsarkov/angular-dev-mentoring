import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { Store } from '@ngrx/store';
import { Observable, of, take, tap } from 'rxjs';
import { loginAction, logoutAction } from 'src/app/store/actions/auth.actions';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { User } from '../models/User';

@Injectable()
export class AuthenticationService {

    private _user: User = { name: { first: '', last: '' }, login: '', password: '' };
    private _user$!: Observable<User>;

    public constructor(
        private readonly router: Router,
        private readonly http: HttpClient,
        private readonly store: Store<{ auth: AuthState }>,
        @Inject(LOCAL_STORAGE) private readonly localStorage: Storage
    ) {
    }

    public login(user: User): void {
        this.http.get<User[]>('http://localhost:3004/users')
            .subscribe(items => {
                const searchedUser = items.find(item => item.login === user.login);
                if (searchedUser !== undefined && searchedUser.password === user.password) {
                    const userToken = `${searchedUser.fakeToken as string}-t-${searchedUser.id}`;
                    this.store.dispatch(loginAction({ token: userToken }));
                    this.router.navigateByUrl('courses');
                }
            });
    }

    public logout(): void {
        this.store.dispatch(logoutAction());
    }

    public isAuthenticated(): boolean {
        if (localStorage.getItem('authState') === null) {
            if (this.localStorage.getItem('authState') === null) {
                return false;
            }
            const authStateAsJson = localStorage.getItem('authState');
            const authStateAsJson = this.localStorage.getItem('authState');
            const authState = JSON.parse(authStateAsJson as string);
            return !!authState.token;
        }

    public getUserInfo(): Observable<User> {
        const authStateAsJson = localStorage.getItem('authState');
        const authStateAsJson = this.localStorage.getItem('authState');

        const authState = JSON.parse(authStateAsJson as string);

        const userId = authState?.token?.split('-t-')[1];

        if (this._user.login !== '') {
            return of(this._user);
        }

        this._user$ = this.http.get<User>(`http://localhost:3004/users/${userId}`)
            .pipe(
                take(1),
                tap(user => {
                    this._user = user;
                })
            );

        return this._user$;
    }
}
