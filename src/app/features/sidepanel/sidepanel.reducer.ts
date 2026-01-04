import { createReducer, on } from '@ngrx/store';
import { initState } from './sidepanel.state';
import {
  clickedGroupsInvList,
  exitGroupsInvList,
  loadListExpenseGroups,
  loadListGroupInvitation,
  loadSuccessLogOut,
  loadUserId,
  resetState,
} from './sidepanel.action';

export const sidepanelReducer = createReducer(
  initState,

  on(loadSuccessLogOut, (state) => ({
    ...state,
    isLogOut: true,
  })),

  on(resetState, (state) => ({
    ...state,
    isLogOut: false,
    userId: 0,
    isGroupInvClicked: false,
  })),

  on(loadListExpenseGroups, (state, { requestDTO }) => ({
    ...state,
    expenseGroup: requestDTO,
  })),

  on(loadListGroupInvitation, (state, { requestDTO }) => ({
    ...state,
    groupInvList: requestDTO,
  })),

  on(exitGroupsInvList, (state) => ({
    ...state,
    isGroupInvClicked: false,
    groupInvList: null,
  })),

  on(loadUserId, (state, { userId }) => ({
    ...state,
    userId: userId,
  })),

  on(clickedGroupsInvList, (state) => ({
    ...state,
    isGroupInvClicked: true,
  }))
);
