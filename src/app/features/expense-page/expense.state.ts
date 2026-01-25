export interface ExpenseState {
  IsSelectedExpenseForm: boolean;
  IsClickedPaidByButton: boolean;
  IsClickedSplitAmongstButton: boolean;
  members: ExpenseMembers[] | null;
}

export interface ExpenseMembers {
  userId: number;
  email: string;
}

export const initState: ExpenseState = {
  IsSelectedExpenseForm: false,
  IsClickedPaidByButton: false,
  IsClickedSplitAmongstButton: false,
  members: null,
};
