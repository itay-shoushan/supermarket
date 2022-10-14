import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() is_admin_mode: boolean;

  @Output() editProductEvent = new EventEmitter<IProduct>();

  public product_quantity: number = 0;
  public isInCart: boolean = false;

  constructor(private cartService: CartService, private route: Router) { }

  ngOnInit(): void { }

  async addToCart(product: IProduct) {
    this.product_quantity++;
    this.isInCart = true;
    const current_product: IProductInCart = {
      product: product,
      quantity: 1
    }
    try {
      const response = await this.cartService.addProductToCart(current_product, this.cart_id);
    } catch (ex: any) {
      ex?.error?.message ? alert(ex?.error?.message) : alert("error please try again")
    }
  }
  async editProduct(product: IProduct) {
    this.editProductEvent.emit(product)
  }
  async decrementQuantity(product: IProduct) {
    if (this.product_quantity === 0) return alert("error please try again");
    if (this.product_quantity === 1) {
      this.isInCart = false;
    }
    this.product_quantity--;
    try {
      const current_product: IProductInCart = {
        product: product,
        quantity: -1
      }
      const response = await this.cartService.updateProductQuantity(current_product, this.cart_id);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("error")
    }
  }
}
