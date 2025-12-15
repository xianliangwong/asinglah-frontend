import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getAccessToken();

  if (token) {
    return true;
  }

  // if there's refresh token in the cookies, then can superpass auth guard else route to login
  return authService.refreshToken().pipe(
    map((res) => {
      authService.setAccessToken(res.data.accessToken);
      return true;
    }),
    catchError(() => {
      return of(router.createUrlTree(['/login']));
    })
  );

  // Not logged in → redirect to login
  //return router.createUrlTree(['/login']);
};
