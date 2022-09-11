import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private serverUrl: string = "";
  private productsSubject = new BehaviorSubject<[]>([]);

  private _cartID$ = new BehaviorSubject<number>(-1);
  cartID$ = this._cartID$.asObservable();
  constructor(private http: HttpClient) { 
    this.serverUrl = environment?.server_url;
  }

  getProducts(){
    const productsUrl = `${this.serverUrl}/products`
    return this.http.get(productsUrl)
  }
}
