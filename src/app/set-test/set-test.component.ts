import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-test',
  templateUrl: './set-test.component.html',
  styleUrls: ['./set-test.component.css']
})
export class SetTestComponent implements OnInit {
  user : firebase.User;
  constructor(
    private loginService : LoginService,
    private router : Router
  ) { }

  ngOnInit() {
    this.loginService.getLoggedInUser()
    .subscribe(user =>{
      this.user = user;
      if(!user){
           this.router.navigateByUrl('/login');
      } 
      // else{
      //  this.router.navigateByUrl('/');
      // }
   })
 }

}
