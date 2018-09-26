import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { hash } from "fast-sha256/sha256";
import { UserModel } from '../Models/userModel';
import { HttpErrorResponse } from '@angular/common/http';
import { JWT } from '../Models/jwt';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

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

    //this.authService.subTitle = "Login";
  }

  submit() {
    var user = this.loginForm.get('nameFormControl').value;
    var password = this.loginForm.get('passwordFormControl').value;
    
    this.authService.getSalt(user)
      .subscribe((str: string) => {
        var first = str.substr(4, 18).substr(0, 9).split('').reverse().join('');
        var second = str.substr(4, 18).substr(9, 9).split('').reverse().join('');
        var hashArray = hash(<any>`${first}${password}${second}`);
        var u = new UserModel(user, btoa(String.fromCharCode.apply(null, hashArray)));

        //first time login
        if(!this.authService.checkExistingToken(u)) {
          //Service will ensure if the userName and password is correct else it will show a failure
          this.authService.createAuthToken(u)
            .subscribe((jwt: JWT) => {
              this.authService.jwt = jwt;
              localStorage.setItem("jwt", jwt.token);
              localStorage.setItem("userName", u.userName);
              localStorage.setItem("password", u.password);
              this.router.navigate(['/Category']);

            }, (error: HttpErrorResponse) => console.log(error))
        } //They have logged in before and their userName and password is correct
        else {
          this.router.navigate(['/Category']);
        }

        
      }, (error: HttpErrorResponse) => console.log(error));
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
}