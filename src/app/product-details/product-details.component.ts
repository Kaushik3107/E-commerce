import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../interfaces/datatypes';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  // quantity: number = 1;
  removeItem = false;
  cartData: product | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    productId &&
      this.productService.getProduct(productId).subscribe((result) => {
        this.productData = result;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId == item.id.toString()
          );
          if (items.length) {
            this.removeItem = true;
          } else {
            this.removeItem = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.productService.getCardList(userId);
          this.productService.CartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.removeItem = true;
            }
          });
        }
      });
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.removeItem = true;
      } else {
        console.warn('user logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn(userId);
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        delete cartData.id;
        this.productService.AddtoCartDB(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCardList(userId);
            this.removeItem = true;
          }
        });
      }
    }
  }

  removeToCart(productId: number) {
    this.productService.localRemoveToCart(productId);
    this.removeItem = false;
  }
}
