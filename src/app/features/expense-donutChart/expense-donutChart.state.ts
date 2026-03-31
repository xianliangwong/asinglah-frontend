import { ExpenseDonutChartResDTO } from 'src/app/model/responseDTO/ExpenseDonutChartResDTO';
import { OweExpenseDetailsDto } from 'src/app/model/responseDTO/OweExpenseDetailsDTO';

export interface ExpenseDonutChartState {
  oweAmount: ExpenseDonutChartResDTO[];
  oweExpenseDetail: OweExpenseDetailsDto[];
  //beingOwedAmount
}

export const initState: ExpenseDonutChartState = {
  oweAmount: [],
  oweExpenseDetail: [],
};
