import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AppComponent } from '../app.component';
import { getLocaleDateTimeFormat } from '@angular/common';
import { subscribeOn } from 'rxjs/operators';
import { UserModel } from '../Models/userModel';

@Injectable()
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkLoggedIn(this.authService.getUser());
  }

  canLoad(route: Route): boolean {
      return this.checkLoggedIn(this.authService.getUser());
  }

  checkLoggedIn(user: UserModel): boolean {
      if(localStorage.getItem("jwt") == null) {
        console.log("Must be logged in first");
        this.router.navigate(['/Login']);
        return false;
      }

      if(localStorage.getItem("userName") != user.userName) {
        console.log("Username is wrong, login with correct Username");
        this.router.navigate(['/Login']);
        return false;
      }

      if(localStorage.getItem("password") != user.password) {
        console.log("Password is wrong, login with correct Password");
        this.router.navigate(['/Login']);
        return false;
      }

      return true;
  }
}