import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LogInService } from '../../services/login.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { login, loadLoginSuccess, loadLoginFail } from './login.action';
import { AuthService } from '../../services/auth.service';
import { APIResponse } from 'src/app/model/responseDTO/APIResponse';
import { LogInResponseDTO } from 'src/app/model/responseDTO/LogInResponseDTO';

@Injectable()
export class LoginEffects {
  //actions can't be initiazed in constructor as the createeffect will run before construtor
  actions$ = inject(Actions);

  constructor(private loginService: LogInService, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ logInRequest }) =>
        this.loginService.login(logInRequest).pipe(
          map((response: APIResponse<LogInResponseDTO>) =>
            loadLoginSuccess({
              accessToken: response.data.accessToken,
              email: response.data.emailAddress,
            })
          ),
          catchError((error) => {
            console.log('error in effect' + error);
            return of(loadLoginFail({ status: 'fail' }));
          })
        )
      )
    )
  );

  storeToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadLoginSuccess),
        tap(({ accessToken }) => this.authService.setAccessToken(accessToken))
      ),
    { dispatch: false }
  );

  debug$ = createEffect(
    () => this.actions$.pipe(tap((action) => console.log('[DEBUG ACTION]', action))),
    { dispatch: false }
  );
}
