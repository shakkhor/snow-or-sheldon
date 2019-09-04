import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  login(){
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider())  

    // this.afAuth.auth.getRedirectResult().then(function(authData) {
    //   console.log(authData);
    // }).catch(function(error) {
    //   console.log(error);
    // });

  //   this.afAuth.auth.onAuthStateChanged(user =>{
  //    
  //   }
  //  })
    console.log('google login works')

  }
  logout(){
    this.afAuth.auth.signOut()
  }

  getLoggedInUser(){
    return this.afAuth.authState;
  }
  signUp(email, password){
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(result =>{
      console.log(result)
    })
      .catch(err =>{
        console.log(err);
      })

  }
  signIn(email, password){
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(result =>{
      console.log(result);
    })
    .catch(err =>{
      console.log(err)
    })
  }
}
