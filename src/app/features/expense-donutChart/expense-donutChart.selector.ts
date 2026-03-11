import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseDonutChartState } from './expense-donutChart.state';

export const selectExpenseDonutChartState =
  createFeatureSelector<ExpenseDonutChartState>('donutchart');

export const selectOweAmountState = createSelector(
  selectExpenseDonutChartState,
  (state) => state.oweAmount,
);

export const selectOweAmountDetail = createSelector(
  selectExpenseDonutChartState,
  (state) => state.oweExpenseDetail,
);
