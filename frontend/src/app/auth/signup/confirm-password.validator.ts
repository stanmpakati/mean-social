import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function MatchPasswords(
  control: AbstractControl
): ValidationErrors | null {
  if (control && control.get('highScore') && control.get('lowScore')) {
    const pass1 = control.get('password1')?.value;
    const pass2 = control.get('password2')?.value;
    return pass1 !== pass2 ? { scoreError: true } : null;
  }
  return null;
}

export function ConfirmPasswordValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmPasswordValidator
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
