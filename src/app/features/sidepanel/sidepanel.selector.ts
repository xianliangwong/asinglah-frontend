import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SidePanelState } from './sidepanel.state';

export const selectLoginState = createFeatureSelector<SidePanelState>('sidepanel');

export const selectLogOut = createSelector(selectLoginState, (state) => state.isLogOut);

export const selectUserId = createSelector(selectLoginState, (state) => state.userId);

export const selectExpenseGroupByUserId = createSelector(
  selectLoginState,
  (state) => state.expenseGroup
);

export const selectGroupInvClickState = createSelector(
  selectLoginState,
  (state) => state.isGroupInvClicked
);

export const selectGrpInvList = createSelector(selectLoginState, (state) => state.groupInvList);

export const selectGroupInvListCount = createSelector(selectGrpInvList, (groupInvList) =>
  groupInvList ? groupInvList.length : 0
);
