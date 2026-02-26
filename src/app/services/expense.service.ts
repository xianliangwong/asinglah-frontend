import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseSplitRequestDTO } from '../model/requestDTO/ExpenseSplitRequestDTO/Create-ExpenseSplit-DTO';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/responseDTO/APIResponse';
import { ExpenseDonutChartResDTO } from '../model/responseDTO/ExpenseDonutChartResDTO';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private apiUrl = 'http://localhost:8080/api/expense';

  constructor(private http: HttpClient) {}

  postExpenseSplit(requestDTO: ExpenseSplitRequestDTO): Observable<APIResponse<string>> {
    return this.http.post<APIResponse<string>>(this.apiUrl + '/v1/expenses', requestDTO);
  }

  getOweDonutChart(
    userId: number,
    groupId: number,
  ): Observable<APIResponse<ExpenseDonutChartResDTO[]>> {
    const params = new HttpParams().set('userId', userId).set('groupId', groupId);

    return this.http.get<APIResponse<ExpenseDonutChartResDTO[]>>(
      this.apiUrl + '/v1/getUserOweExpense',
      { params },
    );
  }
}
