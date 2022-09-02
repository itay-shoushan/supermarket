import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IProduct } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  // public cartIsOpen: boolean = true
  public cart: IProduct[] = [];
  // public products: string[] = ['header1', 'header2', 'header3', 'header4', 'header5', 'header6', 'header7', 'header8', 'header9', 'header10', 'header11', 'header12', 'header13', 'header14', 'header15', 'header16', 'header17', 'header18', 'header19', 'header20', 'header21', 'header22', 'header23', 'header24', 'header25', 'header26', 'header27', 'header28', 'header29']
  public products: IProduct[] = []

  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe({
      error: (ex: any) => {
        alert(ex?.error?.message);
      },
      next: (result: any) => {
        this.products = result?.products;
      },
      complete: () => {

      }
    })
  }

  ngOnInit(): void {
  }
  // setCartLocation(value: boolean) {
  //   this.cartIsOpen = value;
  // }
  addToCart(val: IProduct) {
    this.cart.push(val)
  }

}
