import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseSplitRequestDTO } from '../model/requestDTO/ExpenseSplitRequestDTO/Create-ExpenseSplit-DTO';
import { map, Observable } from 'rxjs';
import { APIResponse } from '../model/responseDTO/APIResponse';
import { ExpenseDonutChartResDTO } from '../model/responseDTO/ExpenseDonutChartResDTO';
import {
  OweExpenseDetailsAPI,
  OweExpenseDetailsDto,
} from '../model/responseDTO/OweExpenseDetailsDTO';

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

  getOweExpenseDetails(
    initPayerName: string,
    userId: number,
    groupId: number,
  ): Observable<APIResponse<OweExpenseDetailsDto[]>> {
    const params = new HttpParams().set('initPayerName', initPayerName).set('userId', userId);

    return this.http
      .get<APIResponse<OweExpenseDetailsAPI[]>>(
        // backticks  string interpolation
        `${this.apiUrl}/v1/${groupId}/expenses/OweExpensesDetail`,
        { params },
      )
      .pipe(
        map((response) => ({
          ...response,
          data: response.data.map((item) => ({
            ...item,
            pendingStatus: item.pendingStatus === 1, // convert 0/1 → boolean
          })),
        })),
      );
  }
}
