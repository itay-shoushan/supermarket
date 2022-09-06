import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { unAuthError } from 'src/app/guards/helper';
import { IProduct, IProductInCart } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProduct
  @Input() cart_id: number;
  public product_quantity: number = 0;
  public isInCart: boolean = false;

  // @Output() add_to_cart_output = new EventEmitter<IProductInCart>();

  constructor(private cartService: CartService, private route: Router) {

  }

  ngOnInit(): void {
  }
  addToCart(product: IProduct) {
    this.product_quantity++;
    this.isInCart = true;
    const current_product: IProductInCart = {
      product: product,
      quantity: this.product_quantity
    }
    // this.add_to_cart_output.emit(current_product);
    this.cartService.addProductToCart(current_product, this.cart_id).subscribe({
      error: (ex: any) => {
        console.log(ex);
        alert(ex?.error?.message)
      },
      next: (response: any) => {
        // alert(response?.message);
      }
    })
  }
  incrementQuantity(product: IProduct) {
    this.product_quantity++;
    const current_product: IProductInCart = {
      product: product,
      quantity: this.product_quantity
    }
    // this.add_to_cart_output.emit(current_product);
    this.cartService.updateProductQuantity(current_product, this.cart_id).subscribe({
      error: (ex: any) => {
        console.log(ex);
        alert(ex?.error?.message)
      },
      next: (response: any) => {
        // alert(response?.message);
      }
    })
  }
  decrementQuantity(product: IProduct) {
    if (this.product_quantity === 0) return alert("error please try again");
    else if (this.product_quantity === 1) {
      this.isInCart = false;
      this.product_quantity--;
      this.cartService.removeProductQuantity(product, this.cart_id).subscribe({
        error: (ex: any) => {
          console.log(ex);
          alert(ex?.error?.message)
        },
        next: (response: any) => {
          // alert(response?.message);
        }
      })
      return
    } else if (this.product_quantity > 1) {
      this.product_quantity--;
      const current_product: IProductInCart = {
        product: product,
        quantity: this.product_quantity
      }
      this.cartService.updateProductQuantity(current_product, this.cart_id).subscribe({
        error: (ex: any) => {
          console.log(ex);
          alert(ex?.error?.message)
        },
        next: (response: any) => {
          // alert(response?.message);
        }
      })
      return
    } else alert("error please try again");
  }

}
