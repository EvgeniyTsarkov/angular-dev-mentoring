import { createAction, props } from '@ngrx/store';

export const loginAction = createAction(
    '[Authentication] Login',
    props<{ token: string }>()
);

export const logoutAction = createAction(
    '[Authentication] Logout'
);
