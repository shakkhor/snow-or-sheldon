import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
  myQuiz : FormGroup;

  id = + new Date()

  
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
      id: this.selectedTest.id,
      title: this.selectedTest.title, 
      uid: this.selectedTest.uid,
    })
    this.myQuiz.setControl('questions', this.setExistingQuestions());

    console.log(this.myQuiz.value)  
  }
setExistingQuestions() :FormArray{
  const formArray = new FormArray([]);
  this.selectedTest.questions.forEach(q =>{
    formArray.push(
      this.fb.group({
        question: q.question,
        option1: q.option1,
        option2: q.option2,
        option3: q.option3,
        option4: q.option4,
        correctAnswer: q.correctAnswer
      }))   
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
    id: [''],
    title : ['', Validators.required],
    uid : ['', Validators.required],
    questions : this.fb.array([])
  })
   
 }
 openDialog(){
   this.digalog.open(DialogComponent)
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
 let date = new Date()
 sub.id = date.valueOf()
  sub = JSON.parse(JSON.stringify(sub))
  
  console.log("subs",date);
  
  // console.log(sub)
  //  this.tests.push(sub)
  //console.log(this.user.uid);
}


update()
{
  let sub = this.myQuiz.value; 
  sub = JSON.parse(JSON.stringify(sub))
  
  console.log("subs",sub);
  this.db.object('/tests/' + sub.id).update(sub)
  
}

delete(){
  let sub = this.myQuiz.value;
  sub = JSON.parse(JSON.stringify(sub))
  this.db.object('/tests/' + sub.id).remove()
}

}
