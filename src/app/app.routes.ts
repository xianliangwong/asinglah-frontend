import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { loginReducer } from './features/login/login.reducer';
import { LoginEffects } from './features/login/login.effects';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'login',
  //   component: Login,
  // },
  // {
  //   path: '**',
  //   redirectTo: 'login',
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./component/login/login').then((m) => m.Login),
    providers: [provideState('login', loginReducer), provideEffects([LoginEffects])],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./component/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
