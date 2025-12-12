import { createAction, props } from '@ngrx/store';
import { LogInDTO } from '../../model/requestDTO/loginDTO/logInDTO';

export const login = createAction('[login] Login ', props<{ logInRequest: LogInDTO }>());

export const loadLoginSuccess = createAction(
  '[login] Load Log In Success',
  props<{ accessToken: string; email: string }>()
);

export const loadLoginFail = createAction('[login] Load Log In Fail', props<{ status: string }>());

export const closeLoginFail = createAction('[login] close Log In Fail');
