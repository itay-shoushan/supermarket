import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddProduct, IProduct } from '../models/product.model';

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
  async editProduct(product: IProduct) {
    const editProductUrl = `${this.serverUrl}/products/edit_product`
    const result = await firstValueFrom(this.http.put(`${editProductUrl}/${product?.id}`, {
      name: product?.name,
      category_id: product?.category_id,
      price: product?.price,
      picture: product?.picture
    }))
    await this.loadProducts();
    return result
  }
  async addProduct(product: IAddProduct) {
    const addProductUrl = `${this.serverUrl}/products/add_product`
    const result = await firstValueFrom(this.http.post(addProductUrl, {
      name: product?.name,
      category_id: product?.category_id,
      price: product?.price,
      picture: product?.picture
    }))
    await this.loadProducts();
    return result
  }
}
