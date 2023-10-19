import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../interfaces/datatypes';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  deleteMessage: undefined | string;
  deleteIcon = faTrash;
  editIcon = faEdit;

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.SellerProductList();
  }

  //Removes the product from the database by seller
  removeProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.deleteMessage = 'Product Deleted Successfully';
        this.SellerProductList();
      }
    });
    setTimeout(() => {
      this.deleteMessage = undefined;
    }, 3000);
  }

  // Display all the added products in the database by seller
  SellerProductList() {
    this.productService.productList().subscribe((result) => {
      this.productList = result;
      console.warn(result);
    });
  }
}
