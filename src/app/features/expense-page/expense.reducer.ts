import { createReducer } from '@ngrx/store';
import { initState } from './expense.state';

export const expenseReducer = createReducer(initState);
