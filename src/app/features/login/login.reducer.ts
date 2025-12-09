import { createReducer, on } from '@ngrx/store';
import { login, loadLoginSuccess, loadLoginFail, closeLoginFail } from './login.action';
import { initState } from './login.state';

export const loginReducer = createReducer(
  initState,

  // When login is triggered → set status to pending and clear errors
  on(login, (state) => ({
    ...state,
    status: 'pending',
    error: null,
  })),

  // When login succeeds → store token and update status
  on(loadLoginSuccess, (state, { accesToken }) => ({
    ...state,
    accessToken: accesToken,
    status: 'success',
    error: null,
  })),

  // When login fails → store error and update status
  on(loadLoginFail, (state, { error }) => ({
    ...state,
    status: 'error',
    error: error,
  })),

  on(closeLoginFail, (state) => ({
    ...state,
    status: 'pending',
    error: null,
  }))
);
