import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  productCategory: { [key: number]: any[] } = {};

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getProducts().subscribe(products => {
      products.forEach(product => {
        this.products.push(product);
        this.api.getProductCategory(product.id).then(categories => {
          this.productCategory[product.id] = [];
          categories.forEach((category: any) => {
            this.api.getCategory(category.category).then(categoryDetails => {
              this.productCategory[product.id].push(categoryDetails);
            });
          });
        });
      });
    });
  }

  onDelete(id: number) {
    this.api.deleteProduct(id).then(() => {
      this.products = this.products.filter(product => product.id !== id);
      window.location.reload();
    });
  }

}
