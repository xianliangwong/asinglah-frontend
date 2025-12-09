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

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      login: loginReducer,
    }),
    provideEffects([LoginEffects]),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
