import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

function passwordMatchConfirmationValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmation = control.get('passwordConfirmation')?.value;
  return password !== confirmation ? { doesntMatch: true } : null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  public showPassword = false;

  public localStrategyForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(45),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(45),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(60),
      ]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchConfirmationValidator }
  );

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
}
