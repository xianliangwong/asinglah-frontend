import { createReducer, on } from '@ngrx/store';
import { initState } from './expense.state';
import {
  clickedCloseExpense,
  clickedCreateExpense,
  clickPaidByButton,
  clickSplitAmongstButton,
  hidePaidByList,
  hideSplitAmongstList,
} from './expense.action';

export const expenseReducer = createReducer(
  initState,
  on(clickedCreateExpense, (state) => ({
    ...state,
    IsSelectedExpenseForm: true,
  })),

  on(clickedCloseExpense, (state) => ({
    ...state,
    IsSelectedExpenseForm: false,
  })),

  on(clickPaidByButton, (state) => ({
    ...state,
    IsClickedPaidByButton: true,
  })),

  on(hidePaidByList, (state) => ({
    ...state,
    IsClickedPaidByButton: false,
  })),

  on(clickSplitAmongstButton, (state) => ({
    ...state,
    IsClickedSplitAmongstButton: true,
  })),

  on(hideSplitAmongstList, (state) => ({
    ...state,
    IsClickedSplitAmongstButton: false,
  })),
);
