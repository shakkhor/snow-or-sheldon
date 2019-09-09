import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css']
})
export class UpdateTestComponent implements OnInit {
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
    private db : AngularFireDatabase,
    private digalog : MatDialog
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
 openDialog(){
   this.digalog.open(DialogComponent)
 }

}
