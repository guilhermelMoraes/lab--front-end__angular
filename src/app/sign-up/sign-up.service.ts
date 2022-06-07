import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import LocalSignUpDto from './sign-up.dto';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private readonly BASE_URL = 'http://localhost:8000/user';

  constructor(private readonly _http: HttpClient) {}

  public submitNewUser(user: LocalSignUpDto): Observable<string> {
    return this._http
      .post(`${this.BASE_URL}/sign-up`, user, {
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(
      (): Error => new Error(`${error.status}: ${error.error}`)
    );
  }
}
