import { ExpenseDonutChartResDTO } from 'src/app/model/responseDTO/ExpenseDonutChartResDTO';

export interface ExpenseDonutChartState {
  oweAmount: ExpenseDonutChartResDTO[];
  //beingOwedAmount
}

export const initState: ExpenseDonutChartState = {
  oweAmount: [],
};
