import { createReducer, on } from '@ngrx/store';
import { initState } from './expense.state';
import { clickedCloseExpense, clickedCreateExpense } from './expense.action';

export const expenseReducer = createReducer(
  initState,
  on(clickedCreateExpense, (state) => ({
    ...state,
    IsSelectedExpenseForm: true,
  })),

  on(clickedCloseExpense, (state) => ({
    ...state,
    IsSelectedExpenseForm: false,
  }))
);
