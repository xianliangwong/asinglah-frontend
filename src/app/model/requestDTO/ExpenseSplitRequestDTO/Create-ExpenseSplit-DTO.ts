import { SplitRequestDTO } from './Split-Request-DTO';

export interface ExpenseSplitRequestDTO {
  creatorId: number;
  payerId: number;
  groupId: number;
  description: string;
  totalAmount: number;
  transactionDate: string;
  splits: SplitRequestDTO[];
}
