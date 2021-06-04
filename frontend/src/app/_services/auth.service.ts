import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../_models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(authDetails: Auth) {
    this.http
      .post('http://localhost:5000/api/user/signup', authDetails)
      .subscribe((response) => {
        console.log(response);
      });
  }

  loginUser(authDetails: Auth) {
    this.http
      .post('http://localhost:5000/api/user/login', authDetails)
      .subscribe((response) => {
        console.log(response);
      });
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
