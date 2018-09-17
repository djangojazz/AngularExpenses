import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AppComponent } from '../app.component';

@Injectable()
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
      return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {
      if(this.authService.jwtToken != null) {
          return true;
      }
      console.log("Must be logged in first");
      this.router.navigate(['/login']);
      return false;
  }
}
