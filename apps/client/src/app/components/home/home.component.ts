import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isUserLoggedIn: boolean;
  public userStatus: number = 2;
  // 0 - first time, 1 - start buying, 2 - continue 
  public numberOfProducts: number;
  public numberOfOrders: number;

  constructor(private productsService: ProductsService, private cartService: CartService, private authService: AuthService) {


  }

  ngOnInit(): void {
    const currentToken = localStorage.getItem("token");
    this.isUserLoggedIn = (!!currentToken)

    if (this.isUserLoggedIn) {
      this.productsService.loadProducts();
      this.productsService.products$.subscribe((res: any) => {
        if (res) this.numberOfProducts = res.length
      })
      this.cartService.loadOrders();
      this.cartService.allOrders$.subscribe((res: any) => {
        if (res) this.numberOfOrders = res.length
      })
    }
  }
  isLogged(isLoggedIn: any) {
    this.isUserLoggedIn = isLoggedIn;
  }
}
