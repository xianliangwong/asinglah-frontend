import { createReducer, on } from '@ngrx/store';
import { initState } from './sidepanel.state';
import { loadListExpenseGroups, loadSuccessLogOut, resetState } from './sidepanel.action';

export const sidepanelReducer = createReducer(
  initState,

  on(loadSuccessLogOut, (state) => ({
    ...state,
    IsLogOut: true,
  })),

  on(resetState, (state) => ({
    ...state,
    IsLogOut: false,
  })),

  on(loadListExpenseGroups, (state, { requestDTO }) => ({
    ...state,
    expenseGroup: requestDTO,
  }))
);
