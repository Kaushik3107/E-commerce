import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup, product } from '../interfaces/datatypes';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  cartCount: number = 0;

  constructor(private route: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          console.warn('Inside Seller Area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.name;
            console.warn(this.sellerName);
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          console.warn('Outside Seller Area');
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartCount = JSON.parse(cartData).length;
    }
    this.productService.CartData.subscribe((data) => {
      this.cartCount = data.length;
    });
  }
  sellerLogout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(val: number) {
    this.route.navigate(['/details/' + val]);
  }

  SearchSubmit(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
}
