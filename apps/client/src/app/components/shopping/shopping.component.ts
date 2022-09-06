import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
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
export class ShoppingComponent implements OnInit, OnChanges {
  // public cart: IProductInCart[] = [];
  public products: IProduct[] = []
  private currentBuyerID: number;
  public currentCartID: number;
  // public currentCartDetails$: Observable<ICartDetail[]>;

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
          // this.cartService.getCartDetails(this.currentCartID).then((r: any) => {
            

          // })
          // this.currentCartDetails$ = this.cartService.products_in_cart$

          // this.cartService.getCartDetails(result?.cart?.id).then((response: any) => {
          //   console.log("responseresponseresponseresponseresponseresponseresponse");
          //   console.log(response?.cartDetails);
          //   console.log("responseresponseresponseresponseresponseresponseresponse");
          //   // this.currentCartDetails = response?.cartDetails as ICartDetail[]
          // }).catch((ex: any) => {
          //   console.log(ex);
          //   alert("error")
          // })

          // try {

          //   this.cartService.getCartDetails(result?.cart?.id)
          // } catch (error) {

          // }
          // this.cartService.getCartDetails(result?.cart?.id).subscribe({
          //   error: (ex: any) => {
          //     console.log(ex);
          //     // alert(ex?.error?.message);
          //   },
          //   next: (response: any) => {
          //     this.currentCartDetails = response?.cartDetails
          //   }
          // })
        }
      })
    }
  }
  ngOnInit(): void {
    // this.cartService.getCartDetails(this.currentCartID);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.currentCartID);

    // if (this.currentCartID) {
    //   console.log(this.currentCartID);
    //   this.cartService.getCartDetails(this.currentCartID);
    // }
  }


}
