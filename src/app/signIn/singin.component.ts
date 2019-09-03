import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signIn',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  singInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
}
