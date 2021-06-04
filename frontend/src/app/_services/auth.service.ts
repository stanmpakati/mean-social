import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Auth } from '../_models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token!: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(authDetails: Auth) {
    this.http
      .post('http://localhost:5000/api/user/signup', authDetails)
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/login');
      });
  }

  loginUser(authDetails: Auth) {
    this.http
      .post<{ token: string; message: string }>(
        'http://localhost:5000/api/user/login',
        authDetails
      )
      .subscribe((response) => {
        console.log(response);
        this.token = response.token;

        if (response.token) {
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
        }
      });
    this.router.navigateByUrl('/');
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigateByUrl('/');
  }

  findEmail(email: string) {
    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/user/email',
      {
        email: email,
      }
    );
  }

  findUsernames(): Observable<{ usernames: string[] }> {
    return this.http.get<{ usernames: string[] }>(
      'http://localhost:5000/api/user/usernames'
    );
  }
}
