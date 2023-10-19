import { Component, OnInit } from '@angular/core';
import { product } from '../interfaces/datatypes';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  productaddedmessage: string | undefined;
  ngOnInit(): void {}

  constructor(private productService: ProductService, private route: Router) {}

  //Add New product in the database by seller
  addNewProduct(data: product) {
    this.productService.AddProduct(data).subscribe((result) => {
      if (result) {
        this.productaddedmessage = 'Product added Successfully';
      }
    });
    setTimeout(() => {
      this.productaddedmessage = undefined;
      this.route.navigate(['seller-home']);
    }, 3000);
  }
}
