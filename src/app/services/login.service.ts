import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInDTO } from '../model/requestDTO/loginDTO/logInDTO';
import { LogInResponseDTO } from '../model/responseDTO/LogInResponseDTO';
import { APIResponse } from '../model/responseDTO/APIResponse';

@Injectable({ providedIn: 'root' })
export class LogInService {
  private apiUrl = 'http://localhost:8080/api/users/login';

  constructor(private http: HttpClient) {}

  login(request: LogInDTO): Observable<APIResponse<LogInResponseDTO>> {
    return this.http.post<APIResponse<LogInResponseDTO>>(this.apiUrl, request, {
      withCredentials: true,
    });
  }
}
