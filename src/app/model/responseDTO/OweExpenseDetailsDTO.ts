export interface OweExpenseDetailsDto {
  expenseDetails: string;
  amount: number;
  pendingStatus: boolean | null;
  expenseSplitId: number;
}

export interface OweExpenseDetailsAPI {
  expenseDetails: string;
  amount: number;
  pendingStatus: number;
  expenseSplitId: number;
}
