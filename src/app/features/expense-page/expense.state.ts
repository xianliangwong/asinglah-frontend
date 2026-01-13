export interface ExpenseState {
  IsSelectedExpenseForm: boolean;
  members: ExpenseMembers[] | null;
}

export interface ExpenseMembers {
  userId: number;
  email: string;
}

export const initState: ExpenseState = {
  IsSelectedExpenseForm: false,
  members: null,
};
