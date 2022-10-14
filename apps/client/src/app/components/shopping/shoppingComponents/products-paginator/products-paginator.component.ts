import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-paginator',
  templateUrl: './products-paginator.component.html',
  styleUrls: ['./products-paginator.component.css']
})
export class ProductsPaginatorComponent implements OnInit {
  p: number = 1;

  @Input() columnSize: string = '';
  @Input() pageSize: number = 12;
  @Input() products: IProduct[] = [];
  @Input() cart_id: number;
  @Input() is_admin_mode: boolean;

  @Output() editProductEvent = new EventEmitter<IProduct>();

  constructor() {

  }
  ngOnInit(): void {
  }
  editProduct(product: IProduct) {
    this.editProductEvent.emit(product)
  }

}
