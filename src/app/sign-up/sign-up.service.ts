import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import LocalSignUpDto from './sign-up.dto';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private readonly BASE_URL = 'http://localhost:8000/users';

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public submitNewUser(user: LocalSignUpDto): Observable<string> {
    return this._http.post<string>(`${this.BASE_URL}/sign-up`, user);
  }
}
