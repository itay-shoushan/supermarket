import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, filter, map, Observable } from 'rxjs';
import { ICartDetail, ICheckoutCart, IUnavailableDate } from 'src/app/models/cart.model';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CitiesService } from 'src/app/services/cities.service';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
// [ { "cart_id": 32, "product_id": 1, "name": "eggs L size", "price": 5, "quantity": 2, "total_price": 10 },
// { "cart_id": 32, "product_id": 3, "name": "cucumber", "price": 3, "quantity": 1, "total_price": 3 },
// { "cart_id": 32, "product_id": 4, "name": "tomato", "price": 2, "quantity": 1, "total_price": 2 } 
// ]
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public currentCartID: number;
  public currentBuyer: IUser;
  public cities: string[] = [];
  public currentDate: Date = new Date;
  public maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1));
  public currentOrder: number;
  searchProductFormControl = new FormControl('');

  products_in_cart$: Observable<ICartDetail[]>;
  private products_in_cart_subject = new BehaviorSubject<ICartDetail[]>([]);

  receiptColumns: string[] = ['name', 'price', 'quantity', 'total_price'];

  public receipt: boolean = false;
  constructor(private authService: AuthService, private cartService: CartService, private citiesService: CitiesService, private router: Router) {
    this.cities = this.citiesService.cities;
    this.searchProductFormControl.valueChanges.pipe(debounceTime(500)).subscribe((v) => {
      if (v) {
        this.products_in_cart$
          .pipe(map(data => data.filter(p => p.name.includes(v))))
          .subscribe((data: any) => {
            console.log(data);
          })
        // this.productsService.filterProductsByValue(v);
        // if (this.selectedCategory === -1) this.selectedCategory--;
        // else this.selectedCategory = -1
      }
      else {
        // this.productsService.loadProducts();
        // if (this.selectedCategory === -1) this.selectedCategory--;
        // else this.selectedCategory = -1
      }
    })
  }
  ngOnInit(): void {
    const user = this.authService.getUserData();
    this.currentBuyer = user;
    if (this.currentBuyer?.id) {
      this.cartService.getCart(this.currentBuyer?.id).subscribe({
        error: (ex: any) => {
          alert(ex?.error?.message);
        },
        next: (result: any) => {
          this.currentCartID = result?.cart?.id;
          this.products_in_cart$ = this.cartService.products_in_cart$;
        }
      })
    }

  }

  async checkout(form: NgForm) {
    if (!this.currentCartID || form.invalid) return
    try {
      const { user_city, user_street, shipping_date, user_credit_card } = form.value
      const currentCheckoutForm: ICheckoutCart = {
        city: user_city,
        street: user_street,
        date: shipping_date,
        credit_card: user_credit_card.toString()
      }
      await this.cartService.checkoutCart(this.currentCartID, currentCheckoutForm).then((result: any) => {
        if (result?.order_id) {
          this.receipt = true;
          this.currentOrder = result?.order_id;
          alert(`order succeed! your order number is: ${result?.order_id} it will arrive at ${shipping_date}`)
        }
      })
    } catch (ex) {
      console.log(ex);
      this.receipt = false;
      alert('somthing went wrong please try again')
    }
  }
  navigateHome() {
    this.router.navigate(['/home'])
  }
}
