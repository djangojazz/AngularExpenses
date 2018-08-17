import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { hash } from "fast-sha256/sha256";
import { AuthService } from '../Services/auth.service';
import { UserModel } from '../Models/userModel';

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
    
    this.authService.getSalt(user)
      .subscribe((str: string) => {
        var first = str.substr(4, 18).substr(0, 9).split('').reverse().join('');
        var second = str.substr(4, 18).substr(9, 9).split('').reverse().join('');
        var hashArray = hash(<any>`${first}${password}${second}`);
        var u = new UserModel(user, btoa(String.fromCharCode.apply(null, hashArray)));
        this.authService.createAuthToken(u);
      });
  }
}