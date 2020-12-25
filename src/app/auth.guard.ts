import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userrole: String
  constructor(private router: Router,
    private authService: AuthenticationService) {
    this.authService.userrole.subscribe(ur => {
      this.userrole = ur
    })
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) {
      if (route.data.role && route.data.role.indexOf(this.userrole) === -1) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}