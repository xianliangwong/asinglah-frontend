import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIResponse } from '../model/responseDTO/APIResponse';
import { UserIdResponseDTO } from '../model/responseDTO/UserIdResponseDTO';
import { UserDTO } from '../model/responseDTO/UsersDTO';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUserId(email: string): Observable<APIResponse<UserIdResponseDTO>> {
    const params = new HttpParams().set('email', email);
    return this.http.get<APIResponse<UserIdResponseDTO>>(this.apiUrl + '/userid', { params });
  }

  searchUser(email: string): Observable<UserDTO[]> {
    const params = new HttpParams().set('email', email);
    return this.http
      .get<APIResponse<UserDTO[]>>(this.apiUrl + '/searchEmail', { params })
      .pipe(map((res) => res.data));
  }
}
