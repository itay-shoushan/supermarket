import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IProduct, IProductInCart } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-paginator',
  templateUrl: './products-paginator.component.html',
  styleUrls: ['./products-paginator.component.css']
})
export class ProductsPaginatorComponent implements OnInit {
  @Input() columnSize: string = '';
  @Input() pageSize: number = 12;
  // @Input() products: any[] | null = [];
  @Input() products: IProduct[] = [];
  p: number = 1;
  @Output() editProductEvent = new EventEmitter<IProduct>();
  @Input() cart_id: number;
  @Input() is_admin_mode: boolean;

  constructor() {

  }
  ngOnInit(): void {
  }
  editProduct(product: IProduct) {
    this.editProductEvent.emit(product)
  }

}
