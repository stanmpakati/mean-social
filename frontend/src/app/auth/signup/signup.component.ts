import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/_models/auth.model';
import { AuthService } from 'src/app/_services/auth.service';
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
    private customValidator: CustomvalidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.email],
          this.customValidator.emailValidator.bind(this.customValidator),
        ],
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
    if (this.form.invalid) return;
    if (this.form.valid) {
      console.log('clicked');

      const authData: Auth = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
      };
      console.log(authData);

      this.authService.createUser(authData);
    }
  }
}
