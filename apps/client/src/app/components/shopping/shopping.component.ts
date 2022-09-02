import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ICartDetail } from 'src/app/models/cart.model';
import { IProduct, IProductInCart } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  // public cartIsOpen: boolean = true
  public cart: IProductInCart[] = [];
  public products: IProduct[] = []
  private currentBuyerID: number;
  public currentCartID: number;
  public currentCartDetails: ICartDetail[];

  constructor(private productsService: ProductsService, private cartService: CartService, private authService: AuthService) {
    const user = this.authService.getUserData();
    this.currentBuyerID = user?.id;
    this.productsService.getProducts().subscribe({
      error: (ex: any) => {
        alert(ex?.error?.message);
      },
      next: (result: any) => {
        this.products = result?.products;
      }
    })
    if (this.currentBuyerID) {
      this.cartService.getCart(this.currentBuyerID).subscribe({
        error: (ex: any) => {
          alert(ex?.error?.message);
        },
        next: (result: any) => {
          this.currentCartID = result?.cart?.id;
          this.cartService.getCartDetails(result?.cart?.id).subscribe({
            error: (ex: any) => {
              console.log(ex);
              // alert(ex?.error?.message);
            },
            next: (response: any) => {
              this.currentCartDetails = response?.cartDetails
            },
            complete: () => {
              localStorage.setItem("cartDetails", JSON.stringify(this.currentCartDetails))
            }
          })
        }
      })
      // if (this.currentCartID) {
      //   this.cartService.getCartDetails(this.currentCartID).subscribe({
      //     error: (ex: any) => {
      //       console.log(ex);
      //       alert(ex?.error?.message);
      //     },
      //     next: (response: any) => {
      //       this.currentCartDetails = response?.cartDetails
      //     },
      //     complete: () => {
      //       localStorage.setItem("cartDetails", JSON.stringify(this.currentCartDetails))
      //     }
      //   })
      // }

    }
  }
  ngOnInit(): void {
  }

}
