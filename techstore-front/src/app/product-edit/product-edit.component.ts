import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {

  id: string | null = null;
  form!: FormGroup;
  name: string = '';
  description: string = '';
  price: number = 0;
  quantity: number = 0;
  created_at: Date = new Date();
  updated_at: Date = new Date();
  category_id: number = 0;
  categories: Category[] = [];
  newProduct: boolean = true;

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get descriptionControl() {
    return this.form.get('description') as FormControl;
  }

  get priceControl() {
    return this.form.get('price') as FormControl;
  }

  get quantityControl() {
    return this.form.get('quantity') as FormControl;
  }

  get categoryControl() {
    return this.form.get('category') as FormControl;
  }

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.generateForm();
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getCategories().subscribe(categories => {
      categories.forEach(category => {
        this.categories.push(category);
      });
    });

    if(this.id && this.id !== 'new'){
      this.newProduct = false;

      this.api.getProductCategory(parseInt(this.id)).then((response) => {
        if(response.length > 0){
          this.category_id = response[0].category;
        }
      });

      this.api.getProduct(parseInt(this.id))
        .then(product => {
          this.name = product.name;
          this.description = product.description;
          this.price = product.price;
          this.quantity = product.quantity;
          this.created_at = product.created_at;
          this.updated_at = product.updated_at;
          this.category_id
          this.generateForm();
        });
    }
  }

  generateForm() {
    this.form = new FormGroup({
      name: new FormControl(this.name, Validators.required),
      description: new FormControl(this.description, Validators.required),
      price: new FormControl(this.price, Validators.required),
      quantity: new FormControl(this.quantity, Validators.required),
      category: new FormControl(this.category_id, Validators.required)
    });
  }

  onSelectionChange(event: any){
    this.category_id = event.target.value;
  }

  onSubmit(){
    if(this.form.valid){
      if(this.newProduct){
        this.api.createProduct({
          name: this.nameControl.value,
          description: this.descriptionControl.value,
          price: this.priceControl.value,
          quantity: this.quantityControl.value,
          created_at: new Date(),
          updated_at: new Date(),
        }).then((response) => {
          const newProductId = response.id;
          this.api.newProductCategory({
            product: newProductId,
            category: parseInt(this.category_id.toString()),
            created_at: new Date(),
            updated_at: new Date(),
          });

          alert('Product created');
          this.router.navigate(['/products']);
        })
      } else {
        this.api.updateProduct({
          id: parseInt(this.id!),
          name: this.nameControl.value,
          description: this.descriptionControl.value,
          price: this.priceControl.value,
          quantity: this.quantityControl.value,
          created_at: this.created_at,
          updated_at: new Date(),
        }).then(() => {
          this.api.getProductCategory(parseInt(this.id!)).then((categoryResponse) => {
            if(categoryResponse.length === 0){
              this.api.newProductCategory({
                product: parseInt(this.id!),
                category: parseInt(this.category_id.toString()),
                created_at: new Date(),
                updated_at: new Date(),
              });
            } else {
              this.api.updateProductCategory({
                id: categoryResponse[0].id,
                product: parseInt(this.id!),
                category: parseInt(this.category_id.toString()),
                created_at: categoryResponse[0].created_at,
                updated_at: new Date(),
              });
            }
          });

          alert('Product updated');
          this.router.navigate(['/products']);
        })
      }
    }
  }

}
