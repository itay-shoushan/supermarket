import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private serverUrl: string = "";

  private productsSubject = new BehaviorSubject<IProduct[]>([]);

  constructor(private http: HttpClient) {
    this.serverUrl = environment?.server_url;
  }
  get products$(): Observable<IProduct[]> {
    return this.productsSubject.asObservable();
  }
  async loadProducts() {
    const productsUrl = `${this.serverUrl}/products`
    const result = await firstValueFrom(this.http.get(productsUrl)).then((res: any) => {
      if (res?.products) {
        this.productsSubject.next(res?.products);
        return res?.products;
      }
      else this.productsSubject.next([]);
    })
    return result
  }
  async filterProductsByCategory(category_id: number) {
    const searchProductByCategoryUrl = `${this.serverUrl}/products/search_all`
    const result = await firstValueFrom(this.http.get(`${searchProductByCategoryUrl}/${category_id}`))
      .then((res: any) => {
        if (res?.products) {
          this.productsSubject.next(res?.products);
          return res?.products;
        }
        else {
          this.productsSubject.next([]);
          this.loadProducts();
        }
      })
    return result
  }
  async filterProductsByValue(product_name: string) {
    const searchProductByNameUrl = `${this.serverUrl}/products/search`
    const result = await firstValueFrom(this.http.get(`${searchProductByNameUrl}/${product_name}`))
      .then((res: any) => {
        if (res?.products) {
          this.productsSubject.next(res?.products);
          return res?.products;
        }
        else {
          this.productsSubject.next([]);
          this.loadProducts();
        }
      })
    return result
  }
}
