import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import LocalSignUpDto from '../sign-up.dto';

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
export class LocalStrategyComponent implements OnChanges {
  @Output()
  public readonly userSubmitted = new EventEmitter<LocalSignUpDto>();

  @Input()
  public submissionSucceeded?: boolean;

  public showPassword = false;

  public localStrategyForm = new FormGroup(
    {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      firstName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      }),
      surname: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(60),
        ],
      }),
      passwordConfirmation: new FormControl('', [
        Validators.required,
      ]),
    },
    { validators: [passwordMatchConfirmationValidator] }
  );

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['submissionSucceeded']?.currentValue === false) {
      this.submissionFailed();
    }

    if (changes['submissionSucceeded']?.currentValue) {
      this.submissionSucceed();
    }
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

  private submissionFailed(): void {
    this.localStrategyForm.enable();
  }

  private submissionSucceed(): void {
    this.localStrategyForm.reset();
    this.localStrategyForm.enable();
  }

  public submitNewUser(): void {
    const { email, firstName, surname, password, passwordConfirmation } =
      this.localStrategyForm.value;

    const userProperties: LocalSignUpDto = {
      email,
      fullName: {
        firstName,
        surname,
      },
      password,
      passwordConfirmation,
    };

    this.userSubmitted.emit(userProperties);
    this.localStrategyForm.disable();
    this.localStrategyForm.markAsPending();
  }
}
