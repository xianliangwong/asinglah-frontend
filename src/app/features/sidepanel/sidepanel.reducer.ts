import { createReducer, on } from '@ngrx/store';
import { initState } from './sidepanel.state';
import { loadListExpenseGroups, loadSuccessLogOut, resetState } from './sidepanel.action';

export const sidepanelReducer = createReducer(
  initState,

  on(loadSuccessLogOut, (state) => ({
    ...state,
    isLogOut: true,
  })),

  on(resetState, (state) => ({
    ...state,
    isLogOut: false,
  })),

  on(loadListExpenseGroups, (state, { requestDTO }) => ({
    ...state,
    expenseGroup: requestDTO,
  }))
);
