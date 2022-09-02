import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { unAuthError } from './helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {

  }
  canActivate() {
    if (this.authService.isLoggedIn()) return true
    else {
      unAuthError(this.route);
      return false
    };
  }

}
