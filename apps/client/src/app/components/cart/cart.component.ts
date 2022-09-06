import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private cartService: CartService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.cart_id !== -1) {
      this.cartService.getCartDetails(this.cart_id);
      this.products_in_cart$ = this.cartService.products_in_cart$
      // this.cartService.getCartDetails(this.cart_id).subscribe({
      //   error: (ex) => {
      //     console.log(ex);
      //     if (ex.error.message) alert(ex.error.message);
      //     else alert("error")
      //   },
      //   next: (response: any) => {
      //     // console.log(response);
      //     this.products_in_cart = response?.cartDetails
      //   }
      // })
    }
  }
  ngOnInit(): void {


  }

}
