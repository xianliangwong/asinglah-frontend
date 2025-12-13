import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInResponseDTO } from '../model/responseDTO/LogInResponseDTO';
import { APIResponse } from '../model/responseDTO/APIResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  private accessToken: string | null = null;

  private apiUrl = 'http://localhost:8080/api/users/refreshAccessToken';

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  //function to refresh expired accessToken
  refreshToken(): Observable<APIResponse<LogInResponseDTO>> {
    return this.http.post<APIResponse<LogInResponseDTO>>(this.apiUrl, { withCredentials: true });
  }
}
