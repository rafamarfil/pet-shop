import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
} from '@angular/router';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private url!: string;
  private session: any;
  private sessionExpires: any;

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.url = state.url;
    if (this.isAuthenticated()) {
      return this.authState();
    }
    return this.notAuthState();
  }

  canLoad(route: Route): boolean {
    this.url = route.path ?? '';

    if (this.isAuthenticated()) {
      return this.authState();
    }
    return this.notAuthState();
  }

  private authState(): boolean {
    if (this.isLoginOrRegister()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  private notAuthState(): boolean {
    localStorage.removeItem('auth_meta');
    if (this.isLoginOrRegister()) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
  private isLoginOrRegister(): boolean {
    if (
      this.url.includes('/auth/login') ||
      this.url.includes('/auth/register')
    ) {
      return true;
    }
    return false;
  }

  private isAuthenticated(): boolean {
    // The session provided by the server is the user logged time, so here we can configure the time session,
    // in this case, 1 hour.
    this.session = JSON.parse(localStorage.getItem('auth_meta') as string);
    this.sessionExpires = moment(this.session.session).add(1, 'hour');
    return moment().isBefore(this.sessionExpires);
  }
}
