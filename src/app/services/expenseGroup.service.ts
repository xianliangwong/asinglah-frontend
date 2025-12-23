import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/responseDTO/APIResponse';
import { JoinedGroupResDTO } from '../model/responseDTO/JoinedGroupResDTO';

@Injectable({ providedIn: 'root' })
export class ExpenseGroupService {
  private apiUrl = 'http://localhost:8080/api/expenseGroup';

  constructor(private http: HttpClient) {}

  getGroupsExpenseByUserId(userId: number): Observable<APIResponse<JoinedGroupResDTO[]>> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<APIResponse<JoinedGroupResDTO[]>>(this.apiUrl + '/user', { params });
  }
}
