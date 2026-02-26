import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { loginReducer } from './features/login/login.reducer';
import { provideEffects } from '@ngrx/effects';
import { LoginEffects } from './features/login/login.effects';
import { AuthInterceptor } from './helper/AuthInterceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { sidepanelReducer } from './features/sidepanel/sidepanel.reducer';
import { SidePanelEffects } from './features/sidepanel/sidepanel.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgChartsModule } from 'ag-charts-angular';

import { ModuleRegistry } from 'ag-charts-community';
import { AllCommunityModule } from 'ag-charts-community';

ModuleRegistry.registerModules([AllCommunityModule]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideStore({ login: loginReducer, sidepanel: sidepanelReducer }), //eager loading
    provideEffects(),
    provideEffects([LoginEffects, SidePanelEffects]),
    provideRouter(routes),
    provideStoreDevtools(),
    // AuthInterceptor,
    // provideHttpClient(withInterceptorsFromDi()),

    //provides http client global, along with authenticator interceptors when access token expires
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(AgChartsModule),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
