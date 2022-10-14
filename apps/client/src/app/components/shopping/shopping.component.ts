import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IProduct } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  private currentBuyerID: number;
  public currentCartID: number;
  public selectedCategory: number;
  public is_admin_mode: boolean = false;
  public isLoading: boolean = false;
  products$: Observable<IProduct[]>;
  searchProductFormControl = new FormControl('');

  constructor(private productsService: ProductsService, private cartService: CartService, private authService: AuthService, private router: Router) {
    this.isLoading = true;
    const user = this.authService.getUserData();
    this.currentBuyerID = user?.id;
    this.productsService.loadProducts();
    this.products$ = this.productsService.products$;

    if (this.currentBuyerID) {
      this.cartService.getCart(this.currentBuyerID).subscribe({
        error: (ex: any) => {
          alert(ex?.error?.message);
          this.isLoading = false;
          router.navigate(['/home'])
        },
        next: (result: any) => {
          this.currentCartID = result?.cart?.id;
          this.isLoading = false;
        }
      })
    }
  }

  ngOnInit(): void {
    this.searchProductFormControl.valueChanges.pipe(debounceTime(500)).subscribe((v) => {
      if (v) {
        this.productsService.filterProductsByValue(v);
        if (this.selectedCategory === -1) this.selectedCategory--;
        else this.selectedCategory = -1
      }
      else {
        this.productsService.loadProducts();
        if (this.selectedCategory === -1) this.selectedCategory--;
        else this.selectedCategory = -1
      }
    })
  }

  ngOnDestroy(): void {
    this.isLoading = false;
  }
}
