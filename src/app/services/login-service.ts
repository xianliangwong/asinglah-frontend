import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInDTO } from '../model/requestDTO/loginDTO/logInDTO';
import { LogInResponseDTO } from '../model/responseDTO/LogInResponseDTO';

@Injectable({ providedIn: 'root' })
export class LogInService {
  private apiUrl = 'http://localhost:8080/api/users/login';

  constructor(private http: HttpClient) {}

  login(request: LogInDTO): Observable<{ response: LogInResponseDTO }> {
    return this.http.post<{ response: LogInResponseDTO }>(this.apiUrl, request);
  }
}
