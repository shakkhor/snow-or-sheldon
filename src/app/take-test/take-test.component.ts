import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { SelectionChange } from '@angular/cdk/collections';
import { MatSelectChange } from '@angular/material';


@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {
  test : any;
  user : firebase.User;
  tests : any;
  JSON = JSON;
  selectedTest;

  myQuiz: FormGroup 
  constructor(
    private loginService : LoginService,
    private router : Router,
    private fb : FormBuilder,
    private db : AngularFireDatabase
  ) { 
    this.db.list('/tests')
    .valueChanges()
    .subscribe( tests =>{
      this.tests = tests;
      console.log(tests)
    })
   
  }
  onSelectionChange = (change: any) => {
    // debugger
    this.selectedTest = change;
  }

  ngOnInit() {
    // debugger
    this.loginService.getLoggedInUser()
    .subscribe(user =>{
      this.user = user;
      if(!user){
           this.router.navigateByUrl('/take-test');
      }
   })

   this.myQuiz = this.fb.group({
     
   })
 }

}
