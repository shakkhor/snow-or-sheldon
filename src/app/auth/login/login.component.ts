import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : firebase.User;
  constructor(
    private service : LoginService
  ) { }

  ngOnInit() {
   this.service.getLoggedInUser()
   .subscribe(user =>{
     this.user = user;
   })
  }

  loginGoogle(){
    this.service.login()
    console.log('logged in');
  }

  logout(){
    this.service.logout();
  }
}
