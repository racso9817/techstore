import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:16001/api/';

  constructor() { }

  getProducts() : Observable<Product[]> {
    return from(fetch(this.url + 'products/')
      .then(response => response.json()));
  }

  getProduct(id: number) {
    return fetch(this.url + 'products/' + id + '/')
      .then(response => response.json());
  }

  createProduct(product: any): Promise<{id: number}> {
    return fetch(this.url + 'products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json());
  }

  updateProduct(product: any) {
    return fetch(this.url + 'products/' + product.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json());
  }

  deleteProduct(id: number) {
    return fetch(this.url + 'products/' + id + '/', {
      method: 'DELETE'
    })
      .then(response => response.json());
  }

  getCategories() : Observable<Category[]> {
    return from(fetch(this.url + 'categories/')
      .then(response => response.json()));
  }

  getCategory(id: number) {
    return fetch(this.url + 'categories/' + id + '/')
      .then(response => response.json());
  }

  createCategory(category: any): Promise<{id: number}> {
    return fetch(this.url + 'categories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    })
      .then(response => response.json());
  }

  updateCategory(category: any): Promise<any> {
    return fetch(this.url + 'categories/' + category.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(`Error: ${error.message}`);
        });
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error updating category:', error);
      throw error;
    });
  }

  deleteCategory(id: number) {
    return fetch(this.url + 'categories/' + id + '/', {
      method: 'DELETE'
    })
      .then(response => response.json());
  }

  getProductCategory(productId: number) {
    return fetch(this.url + 'product-categories/by-product/' + productId + '/')
      .then(response => response.json()).catch(error => {
        console.error('Error getting product category:', error);
        throw error;
      });
  }

  newProductCategory(productCategory: any) {
    return fetch(this.url + 'product-categories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productCategory)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error creating product category:', error);
        throw error;
      });
  }

  updateProductCategory(productCategory: any) {
    return fetch(this.url + 'product-categories/' + productCategory.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productCategory)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error updating product category:', error);
        throw error;
      });
  }

}
