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
      var storageUserName = localStorage.getItem("userName");
      var storagePassword = localStorage.getItem("password");
      var storageJWT = localStorage.getItem("jwt");

      if(storageJWT == null) {
        console.log("Must be logged in first");
        this.router.navigate(['/Login']);
        return false;
      }

      if(storageUserName != user.userName) {
        console.log(`Storage ${storageUserName} passed in: ${user.userName}`);
        console.log("Username is wrong, login with correct Username");
        this.router.navigate(['/Login']);
        return false;
      }

      if(storagePassword != user.password) {
        console.log(`Storage ${storagePassword} passed in: ${user.password}`);
        console.log("Password is wrong, login with correct Password");
        this.router.navigate(['/Login']);
        return false;
      }

      return true;
  }
}