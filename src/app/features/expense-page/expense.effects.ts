import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getGroupMembers, loadGroupMember } from './expense.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ExpenseGroupService } from 'src/app/services/expenseGroup.service';
import { APIResponse } from 'src/app/model/responseDTO/APIResponse';
import { ExpenseMembers } from './expense.state';

@Injectable()
export class ExpenseEffects {
  actions$ = inject(Actions);

  constructor(private expenseGroupService: ExpenseGroupService) {}

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
}
