import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { loginReducer } from './features/login/login.reducer';
import { provideEffects } from '@ngrx/effects';
import { LoginEffects } from './features/login/login.effects';
import { AuthInterceptor } from './helper/AuthInterceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ login: loginReducer }),
    provideEffects(),
    provideEffects([LoginEffects]),
    provideRouter(routes),
    provideStoreDevtools(),
    // AuthInterceptor,
    // provideHttpClient(withInterceptorsFromDi()),

    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
