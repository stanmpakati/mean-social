import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Auth } from '../_models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token!: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {}

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
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
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
