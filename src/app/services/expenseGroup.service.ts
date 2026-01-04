import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/responseDTO/APIResponse';
import { JoinedGroupResDTO } from '../model/responseDTO/JoinedGroupResDTO';
import { CreateExpenseGrpDTO } from '../model/requestDTO/CreateExpenseGrpDTO';
import { CreateExpenseGrpResponse } from '../model/responseDTO/CreateExpenseGrpResponse';
import { GroupInvitationResDTO } from '../model/responseDTO/groupInvitationResDTO';

@Injectable({ providedIn: 'root' })
export class ExpenseGroupService {
  private apiUrl = 'http://localhost:8080/api/expenseGroup';

  constructor(private http: HttpClient) {}

  getGroupsExpenseByUserId(userId: number): Observable<APIResponse<JoinedGroupResDTO[]>> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<APIResponse<JoinedGroupResDTO[]>>(this.apiUrl + '/user', { params });
  }

  createGroupExpense(
    requestDTO: CreateExpenseGrpDTO
  ): Observable<APIResponse<CreateExpenseGrpResponse>> {
    return this.http.post<APIResponse<CreateExpenseGrpResponse>>(this.apiUrl, requestDTO);
  }

  getGroupInvListByUserId(userId: number): Observable<APIResponse<GroupInvitationResDTO[]>> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<APIResponse<GroupInvitationResDTO[]>>(this.apiUrl + '/invitation', {
      params,
    });
  }
}
