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

  constructor(signUpService: SignUpService) {
    this._signUpService = signUpService;
  }

  public submitNewUser(userProperties: LocalSignUpDto): void {
    this._signUpService.submitNewUser(userProperties).subscribe({
      next: (result: string): void => {
        console.log(result);
      },
      error: (error: Error): void => {
        const statusCode = Number(error.message.split(':')[0]);
        if (statusCode === 409) {
        }
      },
    });
  }
}
