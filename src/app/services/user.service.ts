import { Injectable } from '@angular/core';
import { Signup } from '../interfaces/datatypes';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  reloadUser() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/']);
    }
  }
}
