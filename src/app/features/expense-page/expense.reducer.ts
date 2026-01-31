import { createReducer, on } from '@ngrx/store';
import { initState } from './expense.state';
import {
  addPaidByPerson,
  addSplitAmongstList,
  clickedCloseExpense,
  clickedCreateExpense,
  clickPaidByButton,
  clickSplitAmongstButton,
  hidePaidByList,
  hideSplitAmongstList,
  loadGroupMember,
  removePaidByPerson,
  removeSplitAmongstPerson,
  resetExpensePage,
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

  on(loadGroupMember, (state, { requestDTO }) => ({
    ...state,
    members: requestDTO,
  })),

  on(resetExpensePage, (state) => ({
    ...state,
    IsSelectedExpenseForm: false,
    IsClickedPaidByButton: false,
    IsClickedSplitAmongstButton: false,
    members: null,
    paidByPerson: null,
    splitAmongstPerson: null,
  })),

  on(addPaidByPerson, (state, { requestDTO }) => ({
    ...state,
    paidByPerson: requestDTO,
  })),

  on(removePaidByPerson, (state) => ({
    ...state,
    paidByPerson: null,
  })),

  on(addSplitAmongstList, (state, { requestDTO }) => ({
    ...state,
    splitAmongstPerson: [...(state.splitAmongstPerson ?? []), ...requestDTO],
  })),

  on(removeSplitAmongstPerson, (state, { memberId }) => ({
    ...state,
    splitAmongstPerson: (state.splitAmongstPerson ?? []).filter((item) => item.userId !== memberId),
  })),
);
