import { createAction, props } from '@ngrx/store';
import { GroupInvitationResDTO } from 'src/app/model/responseDTO/groupInvitationResDTO';
import { JoinedGroupResDTO } from 'src/app/model/responseDTO/JoinedGroupResDTO';

export const loadLogOut = createAction('[logout] logout clicked');

export const loadSuccessLogOut = createAction('[logout] logout success');

export const loadFailLogOut = createAction('[logout] logout failed');

export const loadGroups = createAction(
  '[userId] load groups from email userid',
  props<{ email: string }>()
);

export const loadListExpenseGroups = createAction(
  '[expense group] load the list of expensegroups',
  props<{ requestDTO: JoinedGroupResDTO[] }>()
);

export const resetState = createAction('[logout] reset state');

export const clickedGroupsInvList = createAction(
  '[expense group] triggered effects for service request'
);

export const loadListGroupInvitation = createAction(
  '[expense group] load list of expense groups invitation list',
  props<{ requestDTO: GroupInvitationResDTO[] }>()
);
