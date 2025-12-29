import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { LogOutService } from 'src/app/services/logout.service';
import {
  loadFailLogOut,
  loadGroups,
  loadListExpenseGroups,
  loadLogOut,
  loadSuccessLogOut,
} from './sidepanel.action';
import { APIResponse } from 'src/app/model/responseDTO/APIResponse';
import { of } from 'rxjs';
import { catchError, concatMap, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';
import { ExpenseGroupService } from 'src/app/services/expenseGroup.service';

@Injectable()
export class SidePanelEffects {
  sidePanelAction$ = inject(Actions);

  constructor(
    private logOutService: LogOutService,
    private authService: AuthService,
    private userService: UserService,
    private expenseGroupService: ExpenseGroupService
  ) {}

  logOut$ = createEffect(() =>
    this.sidePanelAction$.pipe(
      ofType(loadLogOut),
      exhaustMap(() =>
        this.logOutService.logOut().pipe(
          mergeMap(() => {
            this.authService.setAccessToken(null);
            return of(loadSuccessLogOut());
          }),
          catchError((error) => {
            console.error('error in effect', error);

            return of(loadFailLogOut());
          })
        )
      )
    )
  );

  //to do
  expenseGroups$ = createEffect(() =>
    this.sidePanelAction$.pipe(
      ofType(loadGroups),
      concatMap(({ email }) =>
        this.userService.getUserId(email).pipe(
          map((apiResponse) => apiResponse.data.userId),
          concatMap((userId) =>
            this.expenseGroupService.getGroupsExpenseByUserId(userId).pipe(
              map((groups) => loadListExpenseGroups({ requestDTO: groups.data })),
              catchError((error) => {
                return of();
              })
            )
          )
        )
      )
    )
  );
}
