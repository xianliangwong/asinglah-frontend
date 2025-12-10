import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LogInService } from '../../services/login.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { login, loadLoginSuccess, loadLoginFail } from './login.action';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginService: LogInService,
    private authService: AuthService
  ) {
    console.log('LoginEffects constructed, actions$ =', actions$);
  }

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

  storeToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadLoginSuccess),
        tap(({ accesToken }) => this.authService.setAccessToken(accesToken))
      ),
    { dispatch: false }
  );
}
