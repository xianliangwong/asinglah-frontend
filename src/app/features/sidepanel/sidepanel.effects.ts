import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { LogOutService } from 'src/app/services/logout.service';
import {
  loadFailLogOut,
  loadGroups,
  loadListExpenseGroups,
  loadListGroupInvitation,
  loadLogOut,
  loadSuccessLogOut,
  loadUserId,
  updateExpenseGroupInv,
  updateListGroupInvitation,
} from './sidepanel.action';
import { of } from 'rxjs';
import { catchError, concatMap, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';
import { ExpenseGroupService } from 'src/app/services/expenseGroup.service';
import { ToastSignalService } from '../toast/ToastSignalService';

@Injectable()
export class SidePanelEffects {
  sidePanelAction$ = inject(Actions);

  constructor(
    private logOutService: LogOutService,
    private authService: AuthService,
    private userService: UserService,
    private expenseGroupService: ExpenseGroupService,
    private toastSignalService: ToastSignalService
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

  // expenseGroups$ = createEffect(() =>
  //   this.sidePanelAction$.pipe(
  //     ofType(loadGroups),
  //     concatMap(({ email }) =>
  //       this.userService.getUserId(email).pipe(
  //         tap((apiResponse) => {
  //           console.log(apiResponse.data.userId);
  //           return loadUserId({ userId: apiResponse.data.userId });
  //         }),
  //         map((apiResponse) => apiResponse.data.userId),
  //         concatMap((userId) =>
  //           this.expenseGroupService.getGroupsExpenseByUserId(userId).pipe(
  //             map((groups) => loadListExpenseGroups({ requestDTO: groups.data })),
  //             catchError((error) => {
  //               return of();
  //             })
  //           )
  //         )
  //       )
  //     )
  //   )
  // );

  loadUserId$ = createEffect(() =>
    this.sidePanelAction$.pipe(
      ofType(loadGroups),
      concatMap(({ email }) =>
        this.userService.getUserId(email).pipe(
          map((apiResponse) => loadUserId({ userId: apiResponse.data.userId })),
          catchError(() => of())
        )
      )
    )
  );

  expenseGroups$ = createEffect(() =>
    this.sidePanelAction$.pipe(
      ofType(loadUserId),
      concatMap(({ userId }) =>
        this.expenseGroupService.getGroupsExpenseByUserId(userId).pipe(
          map((groups) => loadListExpenseGroups({ requestDTO: groups.data })),
          catchError(() => of())
        )
      )
    )
  );

  groupRequestList$ = createEffect(() =>
    this.sidePanelAction$.pipe(
      ofType(loadUserId),
      exhaustMap(({ userId }) =>
        this.expenseGroupService.getGroupInvListByUserId(userId).pipe(
          map((apiResponse) => loadListGroupInvitation({ requestDTO: apiResponse.data })),
          catchError((error) => of())
        )
      )
    )
  );

  updateGroupInv$ = createEffect(() =>
    this.sidePanelAction$.pipe(
      ofType(updateExpenseGroupInv),
      exhaustMap(({ requestDTO }) =>
        this.expenseGroupService.updateGroupInv(requestDTO).pipe(
          map((APIResponse) => updateListGroupInvitation({ groupId: APIResponse.data.groupId })),
          tap(() => {
            if (requestDTO.statusId === 2) {
              this.toastSignalService.show('Accepted group invitation', 'info');
            } else if (requestDTO.statusId === 3) {
              this.toastSignalService.show('Rejected group invitation', 'info');
            }
          }),
          catchError(() => of())
        )
      )
    )
  );
}
