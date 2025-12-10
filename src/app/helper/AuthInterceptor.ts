// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, switchMap } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
// import { EndPointsConf } from './EndPointsEnv';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.authService.getAccessToken();

//     let authReq = req;

//     if (EndPointsConf.publicEndpoints.some((ep) => req.url.includes(ep))) {
//       return next.handle(req);
//     }

//     if (token) {
//       authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     }

//     return next.handle(authReq).pipe(
//       catchError((error) => {
//         if (error.status === 401) {
//           return this.authService.refreshToken().pipe(
//             switchMap((newToken) => {
//               this.authService.setAccessToken(newToken.response.accessToken);

//               const newAuthReq = req.clone({
//                 setHeaders: {
//                   Authorization: `Bearer ${newToken}`,
//                 },
//               });

//               return next.handle(newAuthReq);
//             })
//           );
//         }

//         return throwError(() => error);
//       })
//     );
//   }
// }
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EndPointsConf } from './EndPointsEnv';
import { catchError, switchMap, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  if (EndPointsConf.publicEndpoints.some((ep) => req.url.includes(ep))) {
    return next(req);
  }

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            authService.setAccessToken(newToken.response.accessToken);

            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken.response.accessToken}`,
              },
            });

            return next(newAuthReq);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
