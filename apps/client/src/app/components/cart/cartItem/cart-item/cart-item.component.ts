import { Component, Input, OnInit } from '@angular/core';
import { ICartDetail } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cart_product:ICartDetail;
  constructor() { }

  ngOnInit(): void {
  }

}
