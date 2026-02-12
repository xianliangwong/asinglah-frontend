import { createAction, props } from '@ngrx/store';
import { ExpenseMembers } from './expense.state';
import { ExpenseSplitRequestDTO } from 'src/app/model/requestDTO/ExpenseSplitRequestDTO/Create-ExpenseSplit-DTO';

export const getGroupMembers = createAction(
  '[expense] get group members based on groupId',
  props<{ expenseGroupId: number }>(),
);

export const loadGroupMember = createAction(
  '[expense] load group member',
  props<{ requestDTO: ExpenseMembers[] }>(),
);

export const clickedCreateExpense = createAction('[expense] clicked create expense');

export const clickedCloseExpense = createAction('[expense] clicked close expense form');

export const clickPaidByButton = createAction('[expense] clicked paid by button');

export const hidePaidByList = createAction('[expense] hide paid by list');

export const clickSplitAmongstButton = createAction('[expense] clicked split amongst button');

export const hideSplitAmongstList = createAction('[expense] hide split amongst list');

export const resetExpensePage = createAction('[expense] reset expense page state');

export const addPaidByPerson = createAction(
  '[expense] add pay by person',
  props<{ requestDTO: ExpenseMembers }>(),
);

export const removePaidByPerson = createAction('[expense] remove paid person');

export const addSplitAmongstList = createAction(
  '[expense] add split amongst list of expense members',
  props<{ requestDTO: ExpenseMembers[] }>(),
);

export const removeSplitAmongstPerson = createAction(
  '[expense] remove split amongst person based on userId',
  props<{ memberId: number }>(),
);

export const postExpenseSplit = createAction(
  '[expense] post expense split',
  props<{ requestDTO: ExpenseSplitRequestDTO }>(),
);
