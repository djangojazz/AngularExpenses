import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { hash } from "fast-sha256/sha256";
import { UserModel } from '../Models/userModel';
import { HttpErrorResponse } from '@angular/common/http';
import { JWT } from '../Models/jwt';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { SharedErrorStateMatcher } from '../Shared/sharedErrorStateMacher';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder, 
    private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      nameFormControl: ['', Validators.required],
      passwordFormControl: ['', Validators.required]
    })

    this.authService.subTitle = "Login";
  }

  submit() {
    var userName = this.loginForm.get('nameFormControl').value;
    var password = this.loginForm.get('passwordFormControl').value;
    
    var storageSalt = localStorage.getItem("salt");
    var u = this.createUserObject(userName, storageSalt || "", password);

    //See if the user already exists and has previously logged in and do not need to go through service again
    if(!this.authService.checkExistingToken(u)) {
      this.authService.getSalt(userName)
        .subscribe((salt: string) => { 
          u = this.createUserObject(userName, salt, password);

          //first time login
          this.authService.createAuthToken(u)
            .subscribe((jwt: JWT) => {
              localStorage.setItem("jwt", jwt.token);
              localStorage.setItem("salt", salt)
              localStorage.setItem("userName", u.userName);
              localStorage.setItem("password", u.password);
              this.authService.setUser(u.userName, u.password);
              this.router.navigate(['/Money']);

            //CreateToken: errors could be from mismatched naming or password is wrong
            }, (error: HttpErrorResponse) => console.log(error))
        
        //Salt: If error will most likely be with missing user
        } , (error: HttpErrorResponse) => console.log(error));
    } else {
      this.router.navigate(['/Money']);
    }
  }


  private createUserObject(userName: string, salt: string, password: string): UserModel {
    var first = salt.substr(4, 18).substr(0, 9).split('').reverse().join('');
    var second = salt.substr(4, 18).substr(9, 9).split('').reverse().join('');
    var hashArray = hash(<any>`${first}${password}${second}`);
    var u = new UserModel(userName, btoa(String.fromCharCode.apply(null, hashArray)));
    return u;
  }

  makeRandomSalt(length: number = null): any {
    if(length == null) {
      length = 16;
    }

    let chars = Array.from("abcdefghijklmnopqrstuvwxyz0123456789");
    
    var result: string = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return btoa(String.fromCharCode.apply(null, hash(<any>` ${result} `)));
  }

  matcher = new SharedErrorStateMatcher();
}