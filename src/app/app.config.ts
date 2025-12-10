import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { loginReducer } from './features/login/login.reducer';
import { provideEffects } from '@ngrx/effects';
import { LoginEffects } from './features/login/login.effects';
import { AuthInterceptor } from './helper/AuthInterceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ login: loginReducer }),
    provideEffects([LoginEffects]),
    provideRouter(routes),

    // AuthInterceptor,
    // provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
