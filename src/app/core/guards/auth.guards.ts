import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
} from '@angular/router';
import { Router } from '@angular/router';
import * as moment from 'moment';

class DecodedToken {
  exp!: number;
  username!: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private url!: string;
  private decodedToken: any;

  constructor(private router: Router) {
    this.decodedToken =
      JSON.parse(localStorage.getItem('auth_meta') as string) ||
      new DecodedToken();
  }

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
    // return moment().isBefore(moment.unix(this.decodedToken.exp));
    return true;
  }
}
