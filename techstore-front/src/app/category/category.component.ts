import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/category';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.api.getCategories().subscribe(categories => {
      this.categories = categories;
      this.cdr.detectChanges();
    });
  }

  onDelete(id: number) {
    this.api.deleteCategory(id).then(() => {
      this.loadCategories();
    });
  }

}
