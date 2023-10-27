import { EventEmitter, Injectable } from '@angular/core';
import { Login, Signup } from '../interfaces/datatypes';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) {}

  userSignup(user: Signup) {
    this.http
      .post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.route.navigate(['/']);
        }
      });
  }

  userLogin(data: Login) {
    this.http
      .get<Signup[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body?.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.route.navigate(['/']);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  reloadUser() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/']);
    }
  }
}
