import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();
class DecodedToken {
  exp!: number;
  username!: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private uri = 'http://localhost/v2';
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem('auth_meta') as string) ||
      new DecodedToken();
  }

  public login(userData: any): Observable<any> {
    const URI = this.uri + '/user/login';

    return this.http.get(URI, { params: userData });
  }

  public register(userData: any): Observable<any> {
    const URI = this.uri + '/user';
    return this.http.post(URI, userData);
  }

  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    this.decodedToken = new DecodedToken();
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    // localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }
}
