import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SidePanelState } from './sidepanel.state';

export const selectLoginState = createFeatureSelector<SidePanelState>('sidepanel');

export const selectLogOut = createSelector(selectLoginState, (state) => state.IsLogOut);
