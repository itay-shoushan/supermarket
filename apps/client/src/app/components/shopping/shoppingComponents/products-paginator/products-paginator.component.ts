import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products-paginator',
  templateUrl: './products-paginator.component.html',
  styleUrls: ['./products-paginator.component.css']
})
export class ProductsPaginatorComponent implements OnInit {
  @Input() columnSize: string = '';
  @Input() pageSize: number = 12;
  @Input() products: string[] = [];
  @Output() productsInCartOutput = new EventEmitter<string>();
  p: number = 1;

  constructor() { }

  addToCart(val:string){
    this.productsInCartOutput.emit(val)
  }
  ngOnInit(): void {
  }

}
