import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { AuthenticationService } from 'src/app/core/services/authenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public constructor(public readonly authService: AuthenticationService) {
  }

  public onSubmit(submittedForm: any) {
    const loggedInUser: User = {
      name: {
        first: 'first name',
        last: 'last name'
      },
      login: submittedForm.email,
      password: submittedForm.password,
    };

    this.authService.login(loggedInUser);
    console.log(`User with login: ${loggedInUser.login} successfully logged in.`);
  }
}
