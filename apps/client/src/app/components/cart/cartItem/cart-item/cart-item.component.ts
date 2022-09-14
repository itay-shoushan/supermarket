import { Component, Input, OnInit } from '@angular/core';
import { ICartDetail } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cart_product: ICartDetail;
  @Input() inCheckout: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }
  async removeProduct(cart_product: ICartDetail) {
    try {
      const response = await this.cartService.removeProduct(cart_product?.product_id, cart_product?.cart_id)
    } catch (ex: any) {
      ex?.error?.message ? alert(ex?.error?.message) : alert("error please try again")
    }
  }
}
