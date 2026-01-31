import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseState } from './expense.state';

// Feature selector — points to the "expense" slice in provideState() in routes
export const selectExpenseState = createFeatureSelector<ExpenseState>('expense');

export const selectClickedExpenseForm = createSelector(
  selectExpenseState,
  (state) => state.IsSelectedExpenseForm,
);

export const selectClickedPaidByButton = createSelector(
  selectExpenseState,
  (state) => state.IsClickedPaidByButton,
);

export const selectClickedSplitAmongstButton = createSelector(
  selectExpenseState,
  (state) => state.IsClickedSplitAmongstButton,
);

export const selectGroupMembers = createSelector(selectExpenseState, (state) => state.members);

export const selectPaidByPerson = createSelector(selectExpenseState, (state) => state.paidByPerson);

export const selectSplitAmongstList = createSelector(
  selectExpenseState,
  (state) => state.splitAmongstPerson,
);
