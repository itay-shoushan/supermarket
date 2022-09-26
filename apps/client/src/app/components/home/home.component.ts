import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  public currentBuyerID: number;
  public currentCartID: number;
  public current_role: string = '';

  total_cart_price$: Observable<number>;

  public numberOfProducts: number;
  public numberOfOrders: number;

  constructor(private productsService: ProductsService, private cartService: CartService, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    const currentToken = localStorage.getItem("token");
    this.isUserLoggedIn = (!!currentToken);

    if (this.isUserLoggedIn) {
      this.productsService.loadProducts();
      this.productsService.products$.subscribe((res: any) => {
        if (res) this.numberOfProducts = res.length
      })
      this.cartService.loadOrders();
      this.cartService.allOrders$.subscribe((res: any) => {
        if (res) this.numberOfOrders = res.length
      })
      const user = this.authService.getUserData();
      this.currentBuyerID = user?.id;
      if (this.currentBuyerID) {
        this.cartService.getCart(this.currentBuyerID).subscribe({
          error: (ex: any) => {
            alert(ex?.error?.message);
          },
          next: (result: any) => {
            this.currentCartID = result?.cart?.id;
            this.cartService.getCartPrice(this.currentCartID);
            this.total_cart_price$ = this.cartService.total_cart_price$;
            this.current_role = this.authService.getUserData()?.role;
          }
        })
      }
    }
  }
  isLogged(isLoggedIn: any) {
    this.isUserLoggedIn = isLoggedIn;
  }
  navigateToShopping() {
    this.router.navigate(['/shopping'])
  }
  navigateAdmin() {
    this.router.navigate(['/management'])
  }
}
