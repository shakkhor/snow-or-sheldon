import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
  sub : any;

  id = + new Date()

  
  constructor(
    private loginService : LoginService,
    private router : Router,
    private fb : FormBuilder,
    private db : AngularFireDatabase,
    private dialog : MatDialog
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
      console.log(user)
      if(!user){
           this.router.navigateByUrl('/take-test');
      }
   })

     
   this.myQuiz = this.fb.group({
    id: [''],
    title :['', Validators.required],
    uid : [''],
    questions : this.fb.array([])
  })
   
 }
 openDialog(): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: "Do you really want to delete this test?"
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      console.log('Yes clicked');
      this.db.object('/tests/' + this.sub.id).remove()
      .then(result=>{
        this.reloadComponent()
      })
      .catch(err=>{
        console.log(err)
      })  
    }
  });
}







 get questionForms(){
  return this.myQuiz.get('questions') as FormArray
}

addQuestion(){
  const question = this.fb.group({
    question:  ['', Validators.required],
    option1:  ['', Validators.required],
    option2:  ['', Validators.required],
    option3: ['', Validators.required],
    option4: ['', Validators.required],
    correctAnswer:  ['', Validators.required]
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
reloadComponent() {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['/update-test']);
}

update()
{
  let sub = this.myQuiz.value; 
  sub = JSON.parse(JSON.stringify(sub))
  
  console.log("subs",sub);
  this.db.object('/tests/' + sub.id).update(sub) 
  this.reloadComponent()
}

delete(){
  this.sub = this.myQuiz.value;
  this.sub = JSON.parse(JSON.stringify(this.sub))
  this.openDialog()

}

}
