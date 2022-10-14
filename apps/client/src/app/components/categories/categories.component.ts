import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<ICategory[]>;
  @Input() selectedCategory: number;

  constructor(private categoriesService: CategoriesService, private productService: ProductsService) { }

  ngOnInit(): void {
    this.categoriesService.loadCategories();
    this.categories$ = this.categoriesService.categories$;
  }
  async filterCategory(category_id: number) {
    try {
      await this.productService.filterProductsByCategory(category_id);
      this.selectedCategory = category_id
    } catch (error) {
      console.log(error);
      this.selectedCategory = -1;
    }
  }
}
