import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { callGetOweDonutChartService, callOweDonutChartReducer } from './expense-donutChart.action';
import { ExpenseService } from 'src/app/services/expense.service';
import { catchError, concatMap, map, of } from 'rxjs';

@Injectable()
export class ExpenseDonutChartEffect {
  actions$ = inject(Actions);

  constructor(private expenseService: ExpenseService) {}

  getOweExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(callGetOweDonutChartService),
      concatMap(({ userId, groupId }) =>
        this.expenseService.getOweDonutChart(userId, groupId).pipe(
          map((response) => callOweDonutChartReducer({ requestDTO: response.data })),
          catchError((error) => {
            console.log('error getting owe expense');
            return of();
          }),
        ),
      ),
    ),
  );
}
