import { createAction } from '@ngrx/store';

export const clickedCreateExpense = createAction('[expense] clicked create expense');

export const clickedCloseExpense = createAction('[expense] clicked close expense form');

export const clickPaidByButton = createAction('[expense] clicked paid by button');

export const hidePaidByList = createAction('[expense] hide paid by list');

export const clickSplitAmongstButton = createAction('[expense] clicked split amongst button');

export const hideSplitAmongstList = createAction('[expense] hide split amongst list');
