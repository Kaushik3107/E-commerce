import { Component, OnInit } from '@angular/core';
import { Signup, cart, product } from '../interfaces/datatypes';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  userAuthError: string = '';
  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

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
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  loadLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.productService.AddtoCartDB(cartData).subscribe((result) => {
            if (result) {
              console.warn('data is stored in DB');
            }
          });
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }
  }
}
