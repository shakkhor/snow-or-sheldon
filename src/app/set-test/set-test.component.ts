import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-set-test',
  templateUrl: './set-test.component.html',
  styleUrls: ['./set-test.component.css']
})
export class SetTestComponent implements OnInit {
  selected: [];
  user : firebase.User;
  myQuiz : FormGroup;
  tests : AngularFireList <any>;
  constructor(
    private loginService : LoginService,
    private router : Router,
    private fb : FormBuilder,
    private db : AngularFireDatabase
  ) { this.tests =  this.db.list('/tests')
  
}

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



   this.myQuiz = this.fb.group({
     title : ['', Validators.required],
     uid : ['', Validators.required],
     questions : this.fb.array([])
   })
 }

 get questionForms(){
   return this.myQuiz.get('questions') as FormArray
 }

 addQuestion(){
   const question = this.fb.group({
     question: new FormControl( ['', Validators.required]),
     option1: new FormControl( ['', Validators.required]),
     option2: new FormControl( ['', Validators.required]),
     option3: new FormControl( ['', Validators.required]),
     option4: new FormControl( ['', Validators.required]),
     correctAnswer: new FormControl( ['', Validators.required])
   })
   this.questionForms.push(question)
 }

 deleteQuestion(i)
 {
   console.log(i)
   this.questionForms.removeAt(i);
 }


 onSubmit(){
  // this.myQuiz. = this.user.uid; 
  let sub = this.myQuiz.value;
  sub.uid = this.user.uid
   sub = JSON.parse(JSON.stringify(sub))
   
   console.log("subs",sub);
    this.tests.push(sub)
   //console.log(this.user.uid);
 }
}
