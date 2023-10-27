import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Signup, product } from '../interfaces/datatypes';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  SellerSignup(data: Signup) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((res) => {
        if (res) {
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigate(['seller-home']);
        }
      });
  }

  SellerLogin(data: Login) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          alert('Please Enter Valid Email id and password');
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
