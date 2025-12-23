import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../model/responseDTO/APIResponse';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LogOutService {
  private apiUrl = 'http://localhost:8080/api/users/logout';

  constructor(private http: HttpClient) {}

  logOut(): Observable<APIResponse<String>> {
    return this.http.post<APIResponse<String>>(
      this.apiUrl,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
