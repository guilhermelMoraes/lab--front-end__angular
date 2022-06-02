import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  public localStrategyForm = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    surname: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmation: new FormControl(''),
  });
}
