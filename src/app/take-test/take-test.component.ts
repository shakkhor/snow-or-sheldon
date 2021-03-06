import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { DialogComponent } from '../dialog/dialog.component';

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
  myQuiz : FormGroup;
  

  
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
       this.selectedTest = change;
  

    this.myQuiz.patchValue({
      title: this.selectedTest.title, 
      uid: this.selectedTest.uid,
    })
    // debugger;
    this.myQuiz.setControl('questions', this.setExistingQuestions());

    console.log(this.myQuiz.value)  
  }
setExistingQuestions() :FormArray{
  const formArray = new FormArray([]);
  this.selectedTest.questions.forEach(q =>{
   let question =  this.fb.group({
      question: q.question,
      option1: q.option1,
      option2: q.option2,
      option3: q.option3,
      option4: q.option4,
      correctAnswer: ''
    });
    formArray.push(question)   
  })
  
  return formArray;

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
    title : ['', Validators.required],
    uid : ['', Validators.required],
    questions : this.fb.array([])
  })
   
 }
 openDialog(whoAmI){
  //  debugger
   this.digalog.open(DialogComponent,{
     data:{
       result : whoAmI
     }
   })
 }







 get questionForms(){
  return this.myQuiz.get('questions') as FormArray
}


reloadComponent() {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['/take-test']);
}

onSubmit(){
 let  answers = this.myQuiz.value.questions
 let i = 0;
 let length = answers.length
//  console.log(length)
 let rightAnswers = 0;
 this.selectedTest.questions.forEach(q =>{
   if(q.correctAnswer == answers[i++].correctAnswer){
     rightAnswers++;
   }
 })
 console.log(rightAnswers)
 let check = (rightAnswers/length);
 console.log(check)
 if(check >= 0.8)
 {
  this.openDialog('sheldon');
 }else if(check <= 0.4)
 {
  this.openDialog('snow');
 }
 else{
  this.openDialog('normal');
 }
 this.reloadComponent()

 

}

}
