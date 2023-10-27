import { Component, OnInit } from '@angular/core';
import { Signup } from '../interfaces/datatypes';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  userAuthError: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.reloadUser();
  }
  isLoggedIn = false;

  Signup(data: Signup) {
    this.userService.userSignup(data);
  }

  LoginUser(data: Signup) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.userAuthError = 'Please Enter Valid User Details';
        alert('User Not Found! Please Enter Valid User Details ');
      }
    });
  }

  loadLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
