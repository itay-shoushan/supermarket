import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product_name: string;
  @Input() product_id: number;
  @Input() product_image: string;
  @Input() product_price: number;
  @Output() addToCartOutput = new EventEmitter<number>()

  public isInCart: boolean = false
  public productQuantity: number = 1
  constructor() { }

  ngOnInit(): void {
  }
  addToCart(product_id: number) {
    console.log(product_id);
    // this.isInCart = true;
    // this.addToCartOutput.emit(cardID)
  }
  incrementQuantity() {
    return this.productQuantity++
  }
  decrementQuantity() {
    if (this.productQuantity === 0) return
    if (this.productQuantity === 1) {
      return this.isInCart = false
    }
    return this.productQuantity--
  }

}
