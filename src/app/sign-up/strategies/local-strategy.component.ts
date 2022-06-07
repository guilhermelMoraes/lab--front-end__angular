import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import LocalSignUpDto from '../sign-up.dto';
import { SignUpService } from '../sign-up.service';

function passwordMatchConfirmationValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmation = control.get('passwordConfirmation')?.value;
  return password !== confirmation ? { doesntMatch: true } : null;
}

@Component({
  selector: 'sign-up-local-strategy',
  templateUrl: './local-strategy.component.html',
  styleUrls: ['../sign-up.component.css'],
})
export class LocalStrategyComponent {
  private readonly _signUpService: SignUpService;
  public showPassword = false;
  public localStrategyForm = new FormGroup(
    {
      email: new FormControl('guilherme.lmoraes32@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      firstName: new FormControl('Guilherme', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(45),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ]),
      surname: new FormControl('Leite Moraes', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(45),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ]),
      password: new FormControl('Thisway@90', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(60),
      ]),
      passwordConfirmation: new FormControl('Thisway@90', [
        Validators.required,
      ]),
    },
    { validators: passwordMatchConfirmationValidator }
  );

  constructor(signUpService: SignUpService) {
    this._signUpService = signUpService;
  }

  public get email(): AbstractControl | null {
    return this.localStrategyForm.get('email');
  }

  public get firstName(): AbstractControl | null {
    return this.localStrategyForm.get('firstName');
  }

  public get surname(): AbstractControl | null {
    return this.localStrategyForm.get('surname');
  }

  public get password(): AbstractControl | null {
    return this.localStrategyForm.get('password');
  }

  public get passwordConfirmation(): AbstractControl | null {
    return this.localStrategyForm.get('passwordConfirmation');
  }

  public changePasswordInputType(): void {
    this.showPassword = !this.showPassword;
  }

  public submitNewUser(): void {
    const { email, firstName, surname, password, passwordConfirmation } =
      this.localStrategyForm.value;

    const userProps: LocalSignUpDto = {
      email,
      fullName: {
        firstName,
        surname,
      },
      password,
      passwordConfirmation,
    };

    this._signUpService.submitNewUser(userProps).subscribe({
      next: (result: string): void => {
        console.log(result);
      },
      error: (error: Error): void => console.log('teste no component', error),
    });
  }
}
