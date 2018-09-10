import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { hash } from "fast-sha256/sha256";
import { AuthService } from '../Services/auth.service';
import { UserModel } from '../Models/userModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  example: string = 'TEST';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      nameFormControl: ['', Validators.required],
      passwordFormControl: ['', Validators.required]
    })
  }

  submit() {
    var user = this.loginForm.get('nameFormControl').value;
    var password = this.loginForm.get('passwordFormControl').value;
    
    //TODO: Work on making salt here
    var u = new UserModel(user, null, this.makeRandomSalt());
    console.log(this.makeRandomSalt);

    // this.authService.getSalt(user)
    //   .subscribe((str: string) => {
    //     var first = str.substr(4, 18).substr(0, 9).split('').reverse().join('');
    //     var second = str.substr(4, 18).substr(9, 9).split('').reverse().join('');
    //     var hashArray = hash(<any>`${first}${password}${second}`);
    //     var u = new UserModel(user, btoa(String.fromCharCode.apply(null, hashArray)));
    //     this.authService.createAuthToken(u);
    //   }, (error: HttpErrorResponse) => console.log(error.error));
  }

  makeRandomSalt(length: number = null, chars: String[] = null): string {
    if(length == null) {
      length = 32;
    }

    if(chars == null) {
      chars = Array.from("abcdefghijklmnopqrstuvwxyz0123456789");
    }

    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return btoa(String.fromCharCode.apply(null, <any>result));
  }

}