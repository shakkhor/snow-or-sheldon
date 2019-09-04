import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {
  user : firebase.User;

  myForm: FormGroup 
  constructor(
    private loginService : LoginService,
    private router : Router,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    this.loginService.getLoggedInUser()
    .subscribe(user =>{
      this.user = user;
      if(!user){
           this.router.navigateByUrl('/take-test');
      }
   })

   this.myForm = this.fb.group({
     
   })
 }

}
