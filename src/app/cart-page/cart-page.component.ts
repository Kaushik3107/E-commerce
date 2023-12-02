import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, summary } from '../interfaces/datatypes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: summary = {
    tax: 0,
    price: 0,
    discount: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private productService: ProductService, private route: Router) {}
  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.tax = price / 10;

      this.priceSummary.total =
        price -
        this.priceSummary.discount +
        this.priceSummary.delivery +
        this.priceSummary.tax;
      console.warn(this.priceSummary);
    });
  }
  checkout() {
    this.route.navigate(['checkout']);
  }
}
