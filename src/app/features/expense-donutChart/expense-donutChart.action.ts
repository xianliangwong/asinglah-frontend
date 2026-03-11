import { createAction, props } from '@ngrx/store';
import { ExpenseDonutChartResDTO } from 'src/app/model/responseDTO/ExpenseDonutChartResDTO';
import { OweExpenseDetailsDto } from 'src/app/model/responseDTO/OweExpenseDetailsDTO';

export const callGetOweDonutChartService = createAction(
  '[donut chart] call GetOweDonutChartService',
  props<{ userId: number; groupId: number }>(),
);

export const callOweDonutChartReducer = createAction(
  '[donut chart] call reducer',
  props<{ requestDTO: ExpenseDonutChartResDTO[] }>(),
);

export const resetOweDonutChartReducer = createAction('[donut chart] reset reducer');

export const callYouOweExpenseDetails = createAction(
  '[donut chart] call owe amount expense detail',
  props<{ initPayerName: string; userId: number; groupId: number }>(),
);

export const setOweExpenseDetailReducer = createAction(
  '[donut chart] set owe expense detail reducer',
  props<{ requestDTO: OweExpenseDetailsDto[] }>(),
);
