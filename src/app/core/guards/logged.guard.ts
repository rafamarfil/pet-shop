import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class LoggedGuard implements Resolve<any> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLogged()) {
      this.router.navigate(['/dashboard']);
    }
  }

  private isLogged(): boolean {
    return localStorage.getItem('auth_meta') ? true : false;
  }
}
