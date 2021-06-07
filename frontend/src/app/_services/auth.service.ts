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
  private tokenTimer!: NodeJS.Timer;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private userId!: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
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
      .post<{
        token: string;
        message: string;
        expiresIn: number;
        userId: string;
      }>('http://localhost:5000/api/user/login', authDetails)
      .subscribe((response) => {
        console.log(response);
        this.token = response.token;

        if (response.token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(this.token, expirationDate, this.userId);

          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.router.navigateByUrl('/');
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) return;

    const now = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation!.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = '';
    this.clearAuthData();
    this.router.navigateByUrl('/');
    clearTimeout(this.tokenTimer);
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

  private setAuthTimer(duration: number) {
    console.log(`timer in ${duration}`);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate || !userId) return;

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
}
