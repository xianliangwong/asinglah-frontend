import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  clickedCloseExpense,
  getGroupMembers,
  loadGroupMember,
  postExpenseSplit,
  resetExpensePage,
} from './expense.action';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ExpenseGroupService } from 'src/app/services/expenseGroup.service';
import { APIResponse } from 'src/app/model/responseDTO/APIResponse';
import { ExpenseMembers } from './expense.state';
import { ExpenseService } from 'src/app/services/expense.service';
import { ToastSignalService } from '../toast/ToastSignalService';

@Injectable()
export class ExpenseEffects {
  actions$ = inject(Actions);

  constructor(
    private expenseGroupService: ExpenseGroupService,
    private expenseService: ExpenseService,
    private toastService: ToastSignalService,
  ) {}

  expenseGroupMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGroupMembers),
      exhaustMap(({ expenseGroupId }) =>
        this.expenseGroupService.getGroupMember(expenseGroupId).pipe(
          map((response: APIResponse<ExpenseMembers[]>) => {
            const members = response.data ?? [];
            const reordered =
              members.length > 0
                ? [members[members.length - 1], ...members.slice(0, members.length - 1)]
                : members;
            return loadGroupMember({ requestDTO: reordered });
          }),
          catchError((error) => {
            console.log('error loading group members: ' + error);
            return of();
          }),
        ),
      ),
    ),
  );

  postExpenseSplit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postExpenseSplit),
      exhaustMap(({ requestDTO }) =>
        this.expenseService.postExpenseSplit(requestDTO).pipe(
          map(() => clickedCloseExpense()),
          tap(() => this.toastService.show('expense split created', 'success')),
          catchError((error) => {
            console.log('error posting expense split : ' + error);
            this.toastService.show('failed to create expense split', 'fail');
            return of();
          }),
        ),
      ),
    ),
  );
}
