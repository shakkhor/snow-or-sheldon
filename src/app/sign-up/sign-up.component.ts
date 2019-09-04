import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  match = true;
  hide = true;
  constructor(
    private loginService : LoginService,
    private fb: FormBuilder
    
  ) { }

  ngOnInit() {
  }
  signUp(){
    console.log(this.password.value);
    this.loginService.signUp(this.email.value, this.password.value)
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is required' :
        this.email.hasError('email') ? 'Please enter a valid email' :
            '';
  }
  getErrorMessagePass(){
    return this.password.hasError('required') ? 'Password is required' : 
     this.password.hasError('minlength') ? 'Password must be 6 characters or more' :   
     '';   
   
  }


  getErrConfirmPass(){
    return this.confirmPassword.hasError('required') ? 'Password confirmation is required' : '';

  }

  getMatch(){
    console.log(this.confirmPassword.value)
    console.log(this.password.value)
    if(this.password.value === this.confirmPassword.value)
     {
       this.match = true;
     } else {
       this.match = false;
     }
  }
  passMatch(){
    return this.match
  }
}
