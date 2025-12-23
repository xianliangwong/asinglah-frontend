import { JoinedGroupResDTO } from 'src/app/model/responseDTO/JoinedGroupResDTO';

export interface SidePanelState {
  IsLogOut: boolean;
  expenseGroup: JoinedGroupResDTO[] | null;
  userId: number;
}

export const initState: SidePanelState = {
  IsLogOut: false,
  expenseGroup: null,
  userId: 0,
};
