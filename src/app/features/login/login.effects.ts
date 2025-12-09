import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LogInService } from '../../services/login-service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { login, loadLoginSuccess, loadLoginFail } from './login.action';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private loginService: LogInService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ logInRequest }) =>
        this.loginService.login(logInRequest).pipe(
          map((response) =>
            loadLoginSuccess({
              accesToken: response.response.accessToken,
              email: response.response.emailAddress,
            })
          ),
          catchError((error) =>
            of(loadLoginFail({ error: error.error?.message || 'Login failed' }))
          )
        )
      )
    )
  );
}
