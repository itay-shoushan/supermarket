import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() cardTitle: string = 'first title';
  @Input() cardID: string = '';
  @Output() addToCartOutput = new EventEmitter<string>()

  public isInCart: boolean = false
  public productQuantity: number = 1
  constructor() { }

  ngOnInit(): void {
  }
  setAddToCart(cardID:string) {
    this.isInCart = true;
    this.addToCartOutput.emit(cardID)
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
