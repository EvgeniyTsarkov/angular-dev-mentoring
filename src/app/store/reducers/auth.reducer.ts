import { createReducer, on } from '@ngrx/store';
import { loginAction, logoutAction } from '../actions/auth.actions';

export interface AuthState {
    token: string | null;
}

export const initialState: AuthState = {
    token: null
};

export const authReducer = createReducer(
    initialState,
    on(loginAction, (state, { token }) => {
        state = { token };
        const authStateAsJson = JSON.stringify(state);
        localStorage.setItem('authState', authStateAsJson);
        return state;
    }),
    on(logoutAction, (state) => {
        state = { token: null };
        localStorage.clear();
        const authStateAsJson = JSON.stringify(state);
        localStorage.setItem('authState', authStateAsJson);
        return state;
    })
);
