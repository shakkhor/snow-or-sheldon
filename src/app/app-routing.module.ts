import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TakeTestComponent } from './take-test/take-test.component';
import { SetTestComponent } from './set-test/set-test.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'take-test', component: TakeTestComponent},
  {path : 'set-test', component: SetTestComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path:'**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
