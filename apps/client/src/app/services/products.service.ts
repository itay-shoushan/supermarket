import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private serverUrl: string = "";

  constructor(private http: HttpClient) { 
    this.serverUrl = environment?.server_url;
  }

  getProducts(){
    const productsUrl = `${this.serverUrl}/products`
    return this.http.get(productsUrl)
  }
}
