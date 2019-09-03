import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login(){
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider())
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
      .catch(err =>{
        console.log(err);
      })

  }
  
}
