import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom,  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICartDetail, ICheckoutCart, IOrder, IUnavailableDate } from '../models/cart.model';
import {  IProductInCart } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private serverUrl: string = "";

  private cartDetailsSubject = new BehaviorSubject<ICartDetail[]>([]);
  private cartTotalPriceSubject = new BehaviorSubject<number>(0);
  private unavailableDatesSubject = new BehaviorSubject<IUnavailableDate[]>([]);
  private allOrdersSubject = new BehaviorSubject<IOrder[]>([]);

  private _cartID$ = new BehaviorSubject<number>(-1);
  cartID$ = this._cartID$.asObservable();

  constructor(private http: HttpClient) {
    this.serverUrl = environment?.server_url;
  }
  get products_in_cart$(): Observable<ICartDetail[]> {
    return this.cartDetailsSubject.asObservable();
  }
  get total_cart_price$(): Observable<number> {
    return this.cartTotalPriceSubject.asObservable();
  }
  get allOrders$(): Observable<IOrder[]> {
    return this.allOrdersSubject.asObservable();
  }
  get unavailableDates$(): Observable<IUnavailableDate[]> {
    return this.unavailableDatesSubject.asObservable();
  }
  getCart(user_id: number) {
    const getCartUrl = `${this.serverUrl}/carts/user_cart`;
    return this.http.get(`${getCartUrl}/${user_id}`);
  }
  async loadOrders() {
    const loadOrdersUrl = `${this.serverUrl}/carts/all_orders`
    const result = await firstValueFrom(this.http.get(loadOrdersUrl)).then((res: any) => {
      if (res?.orders) {
        this.allOrdersSubject.next(res?.orders);
        return res?.orders;
      } else this.allOrdersSubject.next([]);
    })
    return result
  }
  async getCartDetails(cart_id: number): Promise<ICartDetail[]> {
    if (!cart_id) return []
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
  async getCartPrice(cart_id: number) {
    if (!cart_id) return
    const cartPriceUrl = `${this.serverUrl}/carts/cart_total_price`;
    const cart_total_price = await firstValueFrom(this.http.get(`${cartPriceUrl}/${cart_id}`)).then((response: any) => {
      if (response?.total_price) this.cartTotalPriceSubject.next(response?.total_price);
      else this.cartTotalPriceSubject.next(0);
      return response?.total_price
    }).catch((ex: any) => {
      console.log(ex);
    })
    return cart_total_price
  }
  async addProductToCart(product_in_cart: IProductInCart, cart_id: number): Promise<any> {
    const cartUrl = `${this.serverUrl}/carts/add_to_cart`;
    const promise = await firstValueFrom(this.http.post(`${cartUrl}/${cart_id}`, {
      product_id: product_in_cart.product.id,
      quantity: product_in_cart.quantity,
      total_price: product_in_cart.product.price * product_in_cart.quantity
    }))
    await this.getCartDetails(cart_id);
    await this.getCartPrice(cart_id);
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
    await this.getCartPrice(cart_id);
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
    await this.getCartPrice(cart_id);
    return promise
  }
  async checkoutCart(cart_id: number, checkoutObject: ICheckoutCart): Promise<any> {
    const checkoutUrl = `${this.serverUrl}/carts/order`;
    const promise = await firstValueFrom(this.http.post(`${checkoutUrl}/${cart_id}`, {
      city: checkoutObject.city,
      street: checkoutObject.street,
      date: checkoutObject.date,
      credit_card: checkoutObject.credit_card,
    }))
    await this.getUnavailableDates();
    await this.loadOrders();
    return promise
  }
  async getUnavailableDates() {
    const unavailableDatesUrl = `${this.serverUrl}/carts/unavailable_shipping_dates`;
    const unavailableDates = await firstValueFrom(this.http.get(unavailableDatesUrl)).then((response: any) => {
      if (response?.unavailable_shipping_dates) {
        this.unavailableDatesSubject.next(response?.unavailable_shipping_dates);
        return response?.unavailable_shipping_dates;
      } else this.unavailableDatesSubject.next([]);

    }).catch((ex: any) => {
      console.log(ex);
    })
    return unavailableDates
  }
  async clearCart(cart_id: number) {
    const deleteAllCartURL = `${this.serverUrl}/carts/delete_cart`;
    const promise = await firstValueFrom(this.http.delete(`${deleteAllCartURL}/${cart_id}`))
    await this.getCartDetails(cart_id);
    await this.getCartPrice(cart_id);
    return promise
  }
}
