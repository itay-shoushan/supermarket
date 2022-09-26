import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { ICartDetail } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {

  @Input() cart_id: number = -1;
  products_in_cart$: Observable<ICartDetail[]>;
  total_cart_price$: Observable<number>;
  @Input() inCheckout: boolean = false;
  constructor(private cartService: CartService, private router: Router) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.cart_id !== -1) {
      this.cartService.getCartDetails(this.cart_id);
      this.cartService.getCartPrice(this.cart_id);
      this.products_in_cart$ = this.cartService.products_in_cart$;
      this.total_cart_price$ = this.cartService.total_cart_price$;
    }
  }
  isCartEmpty(): boolean {
    let result = true;
    this.products_in_cart$.subscribe((p: any) => {
      if (p.length !== 0) result = false
      else result = true
    })
    return result
  }
  moveToCheckout() {
    this.router.navigate(["/order"])
  }
  backToShopping(cart_id: number) {
    this.router.navigate(["/shopping"])
  }
  async clearCart(cart_id: number) {
    try {
      await this.cartService.clearCart(cart_id);
    } catch (error) {
      console.log(error);
      alert("error")
    }
  }
  ngOnInit(): void {

  }

}
