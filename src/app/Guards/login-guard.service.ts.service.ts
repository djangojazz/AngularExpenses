import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AppComponent } from '../app.component';
import { getLocaleDateTimeFormat } from '@angular/common';
import { subscribeOn } from 'rxjs/operators';

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

  //TODO: Look at this section more
  checkLoggedIn(url: string): boolean {
      if(localStorage.getItem("jwt") != null) {
          return true;
      }
      console.log("Must be logged in first");
      this.router.navigate(['/login']);
      return false;
  }
}