import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loginStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  username = new BehaviorSubject<String>(sessionStorage.getItem('username'));
  userrole = new BehaviorSubject<String>(sessionStorage.getItem('userrole'));

  constructor(private httpClient: HttpClient) { }

  authenticate(username, password) {
    return this.httpClient
      .post<any>('http://localhost:8082/auth/authenticate', {
        username,
        password,
      })
      .pipe(
        map((userData) => {
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('userrole', userData.roles);

          //emit values, so that can be used by others
          this.loginStatus.next(true);
          this.username.next(sessionStorage.getItem('username'));
          this.userrole.next(sessionStorage.getItem('userrole'));

          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  getRole() {
    return;
  }
  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userrole');

    //emit null values
    this.loginStatus.next(false);
    this.username.next(null);
    this.userrole.next(null);
  }
}
