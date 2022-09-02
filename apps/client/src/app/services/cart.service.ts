import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct, IProductInCart } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private serverUrl: string = "";

  private _cartID$ = new BehaviorSubject<number>(-1);
  cartID$ = this._cartID$.asObservable();

  constructor(private http: HttpClient) {
    this.serverUrl = environment?.server_url;
  }

  getCart(user_id: number) {
    const getCartUrl = `${this.serverUrl}/carts/user_cart`;
    return this.http.get(`${getCartUrl}/${user_id}`);
  }
  getCartDetails(cart_id: number) {
    const getCartUrl = `${this.serverUrl}/carts/cart_details`;
    return this.http.get(`${getCartUrl}/${cart_id}`);
  }
  addProductToCart(product_in_cart: IProductInCart, cart_id: number) {
    const cartUrl = `${this.serverUrl}/carts/add_to_cart`;
    return this.http.post(`${cartUrl}/${cart_id}`, {
      product_id: product_in_cart.product.id,
      quantity: product_in_cart.quantity,
      total_price: product_in_cart.product.price * product_in_cart.quantity
    })
  }
  updateProductQuantity(product_in_cart: IProductInCart, cart_id: number) {
    const cartUrl = `${this.serverUrl}/carts/update_quantity`;
    return this.http.put(`${cartUrl}/${cart_id}`, {
      product_id: product_in_cart.product.id,
      quantity: product_in_cart.quantity,
      total_price: product_in_cart.product.price * product_in_cart.quantity
    })
  }
  removeProductQuantity(product: IProduct, cart_id: number) {
    const cartUrl = `${this.serverUrl}/carts/remove_from_cart`;
    return this.http.delete(`${cartUrl}/${cart_id}`, {
      body: {
        product_id: product.id
      }
    })
  }
}
