import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  callGetOweDonutChartService,
  callOweDonutChartReducer,
  callYouOweExpenseDetails,
  setOweExpenseDetailReducer,
} from './expense-donutChart.action';
import { ExpenseService } from 'src/app/services/expense.service';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ExpenseDonutChartEffect {
  actions$ = inject(Actions);

  constructor(private expenseService: ExpenseService) {}

  getOweExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(callGetOweDonutChartService),
      exhaustMap(({ userId, groupId }) =>
        this.expenseService.getOweDonutChart(userId, groupId).pipe(
          mergeMap((response) =>
            of(
              callOweDonutChartReducer({ requestDTO: response.data }),
              callYouOweExpenseDetails({ initPayerName: response.data[0].name, userId, groupId }),
            ),
          ),
          catchError((error) => {
            console.log('error getting owe expense');
            return of();
          }),
        ),
      ),
    ),
  );

  getOweExpenseDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(callYouOweExpenseDetails),
      exhaustMap(({ initPayerName, userId, groupId }) =>
        this.expenseService.getOweExpenseDetails(initPayerName, userId, groupId).pipe(
          map((response) => setOweExpenseDetailReducer({ requestDTO: response.data })),
          catchError((error) => {
            console.log('error getting owe expense details');
            return of();
          }),
        ),
      ),
    ),
  );
}
