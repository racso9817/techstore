import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'product/:id', component: ProductEditComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'category/:id', component: CategoryEditComponent },
  { path: '**', pathMatch: 'full', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
