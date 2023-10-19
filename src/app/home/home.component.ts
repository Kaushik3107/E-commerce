import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../interfaces/datatypes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  PopularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.popularProducts().subscribe((result) => {
      console.warn(result);
      this.PopularProducts = result;
    });

    this.productService.trendyProducts().subscribe((result) => {
      this.trendyProducts = result;
    });
  }
}
