import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/responseDTO/APIResponse';
import { UserIdResponseDTO } from '../model/responseDTO/UserIdResponseDTO';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users/userid';

  constructor(private http: HttpClient) {}

  getUserId(email: string): Observable<APIResponse<UserIdResponseDTO>> {
    const params = new HttpParams().set('email', email);
    return this.http.get<APIResponse<UserIdResponseDTO>>(this.apiUrl, { params });
  }
}
