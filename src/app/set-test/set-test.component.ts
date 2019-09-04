import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
  myQuiz : FormGroup;
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
           this.router.navigateByUrl('/login');
      } 
      // else{
      //  this.router.navigateByUrl('/');
      // }
   })



   this.myQuiz = this.fb.group({
     title : ['', Validators.required],
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

}
