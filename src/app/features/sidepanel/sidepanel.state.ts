import { GroupInvitationResDTO } from 'src/app/model/responseDTO/groupInvitationResDTO';
import { JoinedGroupResDTO } from 'src/app/model/responseDTO/JoinedGroupResDTO';

export interface SidePanelState {
  isLogOut: boolean;
  expenseGroup: JoinedGroupResDTO[] | null;
  userId: number;
  groupInvList: GroupInvitationResDTO[] | null;
  isGroupInvClicked: boolean;
}

export const initState: SidePanelState = {
  isLogOut: false,
  expenseGroup: null,
  userId: 0,
  groupInvList: null,
  isGroupInvClicked: false,
};
