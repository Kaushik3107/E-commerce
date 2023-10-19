import { Component, OnInit } from '@angular/core';
import { product } from '../interfaces/datatypes';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  updatedproductMsg: string | undefined;
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    let productId = this.router.snapshot.paramMap.get('id');
    productId &&
      this.productService.getProduct(productId).subscribe((result) => {
        this.productData = result;
      });
  }
  UpdateProduct(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        console.warn(result);

        this.updatedproductMsg = 'Product has been Updated Successfully';
      }
      setTimeout(() => {
        this.updatedproductMsg = undefined;
        this.route.navigate(['seller-home']);
      }, 3000);
    });
  }
}
