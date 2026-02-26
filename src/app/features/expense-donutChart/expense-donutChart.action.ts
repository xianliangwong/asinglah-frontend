import { createAction, props } from '@ngrx/store';
import { ExpenseDonutChartResDTO } from 'src/app/model/responseDTO/ExpenseDonutChartResDTO';

export const callGetOweDonutChartService = createAction(
  '[donut chart] call GetOweDonutChartService',
  props<{ userId: number; groupId: number }>(),
);

export const callOweDonutChartReducer = createAction(
  '[donut chart] call reducer',
  props<{ requestDTO: ExpenseDonutChartResDTO[] }>(),
);

export const resetOweDonutChartReducer = createAction('[donut chart] reset reducer');
