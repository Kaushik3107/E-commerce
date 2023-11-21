import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Login, Signup, cart, product } from '../interfaces/datatypes';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  isLoggedIn = false;
  constructor(private sellerService: SellerService) {}
  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }
  Signup(data: Signup) {
    this.sellerService.SellerSignup(data);
  }
  SellerLogin(data: Login) {
    this.sellerService.SellerLogin(data);
  }
  loadLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
