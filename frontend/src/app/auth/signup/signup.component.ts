import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomvalidationService } from 'src/app/_services/customvalidation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  form!: FormGroup;
  submitted = false;
  isPassword = true;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: [
          '',
          [Validators.required],
          this.customValidator.userNameValidator.bind(this.customValidator),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  get registerFormControl() {
    return this.form.controls;
  }

  onSignup() {
    this.submitted = true;
    if (this.form.valid) {
      alert(
        'Form Submitted succesfully!!!\n Check the values in browser console.'
      );
      console.table(this.form.value);
    }
  }
}
