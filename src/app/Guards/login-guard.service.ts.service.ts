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

  checkLoggedIn(url: string): boolean {
      if(this.authService.jwt != null) {
          var token = this.authService.jwt.token;
          console.log(token);
          var data = this.authService.decodeToken(token);
          console.log(data);
          var dt = new Date(0);//.setSeconds(data.exp);
          dt.setUTCSeconds(data.exp);
          console.log(dt);
          return true;
      }
      console.log("Must be logged in first");
      this.router.navigate(['/login']);
      return false;
  }
}