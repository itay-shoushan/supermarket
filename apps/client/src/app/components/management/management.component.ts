import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { IAddProduct, IProduct } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  products$: Observable<IProduct[]>;
  public currentProduct: IProduct | null;
  public editMode: boolean = false
  public selectedCategory: number;

  categories$: Observable<ICategory[]>;

  constructor(private productsService: ProductsService, private cartService: CartService, private authService: AuthService, private router: Router, private categoriesService: CategoriesService) {

    this.productsService.loadProducts();
    this.products$ = this.productsService.products$;

    this.categoriesService.loadCategories();
    this.categories$ = this.categoriesService.categories$;

  }

  ngOnInit(): void {
  }
  exitEditing(form: NgForm) {
    this.editMode = false;
    this.currentProduct = null;
    form.reset();
  }
  clearForm(form: NgForm) {
    form.reset();
  }
  editProduct(product: IProduct) {
    this.currentProduct = { ...product }
    this.editMode = true;
  }
  async submit(form: NgForm) {
    if (!form.valid) return
    if (this.editMode) {
      if (!this.currentProduct?.id) return alert('somthing went wrong');
      const currentProduct: IProduct = {
        id: this.currentProduct?.id,
        name: form.value?.product_name,
        category_id: form.value?.category_id,
        price: form.value?.product_price,
        picture: form.value?.product_url
      }
      try {
        const result = await this.productsService.editProduct(currentProduct)
        if (result) {
          alert("edited succeed!");
          this.exitEditing(form)
        }
      } catch (error) {
        console.log(error);
        alert("edit product failed please try again")
      }
    } else {
      const currentProduct: IAddProduct = {
        name: form.value?.product_name,
        category_id: form.value?.category_id,
        price: form.value?.product_price,
        picture: form.value?.product_url
      }
      try {
        const result = await this.productsService.addProduct(currentProduct)
        if (result) {
          alert("product added succeed!");
          form.reset();
        }
      } catch (error) {
        console.log(error);
        alert("add product failed please try again")
      }
    }

  }
}
