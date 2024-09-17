import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {

  id: string | null = null;
  name: string = '';
  description: string = '';
  created_at: Date = new Date();
  updated_at: Date = new Date();
  newCategory: boolean = true;
  form!: FormGroup;

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get descriptionControl() {
    return this.form.get('description') as FormControl;
  }

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.generateForm();
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id && this.id !== 'new'){
      this.newCategory = false;

      this.api.getCategory(parseInt(this.id))
        .then(category => {
          this.name = category.name;
          this.description = category.description;
          this.created_at = category.created_at;
          this.updated_at = category.updated_at;
        });
    }
  }

  generateForm() {
    this.form = new FormGroup({
      name: new FormControl(this.name),
      description: new FormControl(this.description)
    });
  }

  onSubmit(){
    if(this.form.valid){
      if(this.newCategory){
        this.api.createCategory(this.form.value)
          .then(response => {
            alert('Category created');
            this.router.navigate(['/categories']);
          });
      } else {
        this.api.updateCategory({
          id: parseInt(this.id!),
          name: this.nameControl.value,
          description: this.descriptionControl.value,
          created_at: this.created_at,
          updated_at: new Date()
        })
          .then(response => {
            alert('Category updated');
            this.router.navigate(['/categories']);
          });
      }
    }
  }

}
