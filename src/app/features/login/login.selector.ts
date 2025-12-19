import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogInState } from './login.state';

// Feature selector — points to the "login" slice in provideStore()
export const selectLoginState = createFeatureSelector<LogInState>('login');

// Select access token
export const selectAccessToken = createSelector(selectLoginState, (state) => state.accessToken);

// Select login status (pending | success | error)
export const selectLoginStatus = createSelector(selectLoginState, (state) => state.status);

// Select login error
export const selectLoginError = createSelector(selectLoginState, (state) => state.error);

export const selectLoginEmail = createSelector(selectLoginState, (state) => {
  if (state.status === 'success') {
    return {
      email: state.name,
    };
  }
  return null;
});

export const selectLoginSuccessWithToken = createSelector(selectLoginState, (state) => {
  if (state.status === 'success') {
    return {
      status: state.status,
      accessToken: state.accessToken,
    };
  }
  return null;
});
