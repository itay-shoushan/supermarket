import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
export class ShoppingComponent implements OnInit, OnChanges, OnDestroy {
  // public cart: IProductInCart[] = [];
  // public products: IProduct[] = []
  private currentBuyerID: number;
  public currentCartID: number;
  public selectedCategory: number;
  public is_admin_mode: boolean = false;
  public isLoading: boolean = false;
  products$: Observable<IProduct[]>;
  searchProductFormControl = new FormControl('');
  // @Output() currentCartIDEvent = new EventEmitter<number>();
  // searchProductInput: FormControl<string>;
  // searchProductInput: string = '';
  // public currentCartDetails$: Observable<ICartDetail[]>;

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
  // async init() {
  //   try {
  //     const response = await this.productsService.loadProducts();
  //     console.log(response);
  //   } catch (ex: any) {
  //     console.log(ex);
  //     ex?.error?.message ? alert(ex?.error?.message) : alert("error please try again")
  //   }
  // }
  ngOnInit(): void {

    // console.log(this.selectedCategory);

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

    // this.searchProductInput.valueChanges.subscribe((r: any) => {
    //   console.log(r);

    // })
    // this.productsService.loadProducts();
    // this.products$ = this.productsService.products$;
    // this.cartService.getCartDetails(this.currentCartID);
  }
  clearInput() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);

    // console.log(this.selectedCategory);
    // console.log(this.searchProductFormControl.value);
    // this.searchProductInput.valueChanges.subscribe((res: any) => {
    //   console.log(res);
    // })
    // console.log(this.searchProductInput);

    // console.log(this.searchProductInput);

    // this.products$ = this.productsService.products$;
    // console.log(this.currentCartID);

    // if (this.currentCartID) {
    //   console.log(this.currentCartID);
    //   this.cartService.getCartDetails(this.currentCartID);
    // }
  }
  ngOnDestroy(): void {
    this.isLoading = false;
  }
}
