import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { loginReducer } from './features/login/login.reducer';
import { LoginEffects } from './features/login/login.effects';
import { AuthGuard } from './helper/auth.guard';

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
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    providers: [provideState('login', loginReducer), provideEffects([LoginEffects])],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'expensegroup/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/expense-page/expense-page.component').then((m) => m.ExpensePageComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
