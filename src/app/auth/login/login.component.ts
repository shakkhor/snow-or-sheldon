import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user : firebase.User;
  constructor(
    private service : LoginService,
    private router : Router
  ) { }

  ngOnInit() {
   this.service.getLoggedInUser()
   .subscribe(user =>{
     this.user = user;
     if(user){
          this.router.navigateByUrl('/take-test');
     } else{
      this.router.navigateByUrl('/');
     }
  })
}


  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);



  loginGoogle(){
    this.service.login()
    console.log('logged in');
  }

  logout(){
    this.service.logout();
  }

  signIn(){
    this.service.signIn(this.email.value, this.password.value);
  }



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
}
