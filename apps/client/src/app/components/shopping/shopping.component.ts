import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  public cartIsOpen: boolean = true
  public cart: string[] = [];
  public products: string[] = ['header1', 'header2', 'header3', 'header4', 'header5', 'header6', 'header7', 'header8', 'header9', 'header10', 'header11', 'header12', 'header13', 'header14', 'header15', 'header16', 'header17', 'header18', 'header19', 'header20', 'header21', 'header22', 'header23', 'header24', 'header25', 'header26', 'header27', 'header28', 'header29']

  constructor() { }

  ngOnInit(): void {
  }
  setCartLocation(value: boolean) {
    this.cartIsOpen = value;
  }
  addToCart(val: string) {
    this.cart.push(val)
  }

}
