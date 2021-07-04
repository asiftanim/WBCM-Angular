import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppAuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AppAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated() == false) {
      return true;
    }
    else {

      //this.authService.login();
      this.authService.navigateToHomePage();
      return false;
    }
  }
}
