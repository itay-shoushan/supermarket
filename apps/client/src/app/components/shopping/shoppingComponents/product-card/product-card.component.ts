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
  async addToCart(product: IProduct) {
    this.product_quantity++;
    this.isInCart = true;
    const current_product: IProductInCart = {
      product: product,
      quantity: this.product_quantity
    }
    try {
      const response = await this.cartService.addProductToCart(current_product, this.cart_id);
      alert(response?.message)
    } catch (ex: any) {
      ex?.error?.message ? alert(ex?.error?.message) : alert("error please try again")
    }
  }
  async incrementQuantity(product: IProduct) {
    this.product_quantity++;
    const current_product: IProductInCart = {
      product: product,
      quantity: this.product_quantity
    }
    try {
      const response = await this.cartService.updateProductQuantity(current_product, this.cart_id);
      alert(response?.message)
    } catch (ex: any) {
      ex?.error?.message ? alert(ex?.error?.message) : alert("error please try again")
    }
  }
  async decrementQuantity(product: IProduct) {
    if (this.product_quantity === 0) return alert("error please try again");
    else if (this.product_quantity === 1) {
      this.isInCart = false;
      this.product_quantity--;
      try {
        const response = await this.cartService.removeProduct(product, this.cart_id);
        alert(response?.message);
      } catch (ex: any) {
        ex?.error?.message ? alert(ex?.error?.message) : alert("error please try again")
      }
    } else if (this.product_quantity > 1) {
      this.product_quantity--;
      const current_product: IProductInCart = {
        product: product,
        quantity: this.product_quantity
      }
      try {
        const response = await this.cartService.updateProductQuantity(current_product, this.cart_id);
        alert(response?.message)
      } catch (ex: any) {
        ex?.error?.message ? alert(ex?.error?.message) : alert("error please try again")
      }
    } else alert("error please try again");
  }

}
