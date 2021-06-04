import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/_models/auth.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  submitted = false;
  form!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  get formControl() {
    return this.form.controls;
  }

  onLogin() {
    if (this.form.invalid) return;
    this.submitted = true;
    this.isLoading = true;

    const auth: Auth = {
      email: this.form.value.email,
      username: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.loginUser(auth);
    this.form.reset();
    this.isLoading = false;
  }
}
