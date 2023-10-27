import { Component, OnInit } from '@angular/core';
import { Signup } from '../interfaces/datatypes';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.reloadUser();
  }
  isLoggedIn = false;

  Signup(data: Signup) {
    this.userService.userSignup(data);
  }

  LoginUser(data: Signup) {
    console.warn(data);
  }

  loadLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
