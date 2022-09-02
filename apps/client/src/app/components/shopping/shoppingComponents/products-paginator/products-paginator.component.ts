import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-paginator',
  templateUrl: './products-paginator.component.html',
  styleUrls: ['./products-paginator.component.css']
})
export class ProductsPaginatorComponent implements OnInit {
  @Input() columnSize: string = '';
  @Input() pageSize: number = 12;
  @Input() products: IProduct[] = [];
  // @Output() productsInCartOutput = new EventEmitter<IProduct>();
  p: number = 1;

  constructor() { }

  // addToCart(val:IProduct){
    // this.productsInCartOutput.emit(val)
  // }
  ngOnInit(): void {
  }

}
