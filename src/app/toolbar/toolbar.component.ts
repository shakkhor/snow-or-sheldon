import { LoginService } from './../auth/login.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: firebase.User;

  constructor(
    private loginService : LoginService
  ) { }

  ngOnInit() {
    this.loginService.getLoggedInUser()
    .subscribe(user =>{
      this.user = user;
    })
  }

  loginGoogle(){
    this.loginService.login()
    console.log('logged in');
  }


  logout(){
    this.loginService.logout();
  }
 

}
