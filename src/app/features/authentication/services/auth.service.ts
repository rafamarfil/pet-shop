import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URI_LOCALHOST, USER_LOGIN, USER_REGISTER } from './http-consts';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(userData: any): Observable<any> {
    const URL = URI_LOCALHOST + USER_LOGIN;

    return this.http.get(URL, { params: userData }).pipe(
      map((resp: any) => {
        const sessionString = resp.message.replace(/[^0-9]/g, '');
        const sessionNumber = parseInt(sessionString, 10);
        this.saveSession({
          session: sessionNumber,
          username: userData.username,
        });
      })
    );
  }

  public register(userData: any): Observable<any> {
    const URL = URI_LOCALHOST + USER_REGISTER;
    return this.http.post(URL, userData);
  }

  public logout(): void {
    localStorage.removeItem('auth_meta');
  }

  private saveSession(session: any): any {
    localStorage.setItem('auth_meta', JSON.stringify(session));
  }
}
