import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICartDetail } from '../models/cart.model';
import { IProduct, IProductInCart } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private serverUrl: string = "";

  private cartDetailsSubject = new BehaviorSubject<ICartDetail[]>([]);

  private _cartID$ = new BehaviorSubject<number>(-1);
  cartID$ = this._cartID$.asObservable();

  constructor(private http: HttpClient) {
    this.serverUrl = environment?.server_url;
  }
  get products_in_cart$(): Observable<ICartDetail[]> {
    return this.cartDetailsSubject.asObservable();
  }
  getCart(user_id: number) {
    const getCartUrl = `${this.serverUrl}/carts/user_cart`;
    return this.http.get(`${getCartUrl}/${user_id}`);
  }
  async getCartDetails(cart_id: number): Promise<ICartDetail[]> {
    const getCartUrl = `${this.serverUrl}/carts/cart_details`;
    const products_in_cart = await firstValueFrom(this.http.get(`${getCartUrl}/${cart_id}`)).then((response: any) => {
      if (response?.cartDetails) this.cartDetailsSubject.next(response?.cartDetails);
      else this.cartDetailsSubject.next([]);
      return response?.cartDetails
    }).catch((ex: any) => {
      console.log(ex);

    })
    return products_in_cart
  }
  async addProductToCart(product_in_cart: IProductInCart, cart_id: number): Promise<any> {
    const cartUrl = `${this.serverUrl}/carts/add_to_cart`;
    const promise = await firstValueFrom(this.http.post(`${cartUrl}/${cart_id}`, {
      product_id: product_in_cart.product.id,
      quantity: product_in_cart.quantity,
      total_price: product_in_cart.product.price * product_in_cart.quantity
    }))
    await this.getCartDetails(cart_id);
    return promise
  }
  async updateProductQuantity(product_in_cart: IProductInCart, cart_id: number): Promise<any> {
    const cartUrl = `${this.serverUrl}/carts/update_quantity`;
    const promise = await firstValueFrom(this.http.put(`${cartUrl}/${cart_id}`, {
      product_id: product_in_cart.product.id,
      quantity: product_in_cart.quantity,
      total_price: product_in_cart.product.price * product_in_cart.quantity
    }))
    await this.getCartDetails(cart_id);
    return promise
  }

  async removeProduct(product_id: number, cart_id: number): Promise<any> {
    const cartUrl = `${this.serverUrl}/carts/remove_from_cart`;
    const promise = await firstValueFrom(this.http.delete(`${cartUrl}/${cart_id}`, {
      body: {
        product_id: product_id
      }
    }))
    await this.getCartDetails(cart_id);
    return promise
  }
}
