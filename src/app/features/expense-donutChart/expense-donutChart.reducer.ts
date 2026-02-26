import { createReducer, on } from '@ngrx/store';
import { initState } from './expense-donutChart.state';
import { callOweDonutChartReducer, resetOweDonutChartReducer } from './expense-donutChart.action';

export const expenseDonutChart = createReducer(
  initState,

  on(callOweDonutChartReducer, (state, { requestDTO }) => ({
    ...state,
    oweAmount: requestDTO,
  })),

  on(resetOweDonutChartReducer, (state) => ({
    ...state,
    oweAmount: [],
  })),
);
