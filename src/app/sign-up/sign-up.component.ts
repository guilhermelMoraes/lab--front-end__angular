import { Component } from '@angular/core';
import LocalSignUpDto from './sign-up.dto';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  private readonly _signUpService: SignUpService;
  public submissionSucceeded?: boolean;

  constructor(signUpService: SignUpService) {
    this._signUpService = signUpService;
  }

  public submitNewUser(userProperties: LocalSignUpDto): void {
    this.submissionSucceeded = undefined;
    this._signUpService.submitNewUser(userProperties).subscribe({
      next: (result: string): void => {
        this.submissionSucceeded = true;
      },
      error: (error): void => {
        this.submissionSucceeded = false;
      },
    });
  }
}
