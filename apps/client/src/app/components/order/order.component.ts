import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, map, Observable } from 'rxjs';
import { ICartDetail, ICheckoutCart, IUnavailableDate } from 'src/app/models/cart.model';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CitiesService } from 'src/app/services/cities.service';

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
  public receipt: boolean = false;
  public isDateValid: boolean = true;

  searchProductFormControl = new FormControl('');
  products_in_cart$: Observable<ICartDetail[]>;
  unavailableDates$: Observable<IUnavailableDate[]>;

  receiptColumns: string[] = ['name', 'price', 'quantity', 'total_price'];

  constructor(private authService: AuthService, private cartService: CartService, private citiesService: CitiesService, private router: Router) {
    this.cities = this.citiesService.cities;
    this.searchProductFormControl.valueChanges.pipe(debounceTime(500)).subscribe((v) => {
      if (v) {
        this.products_in_cart$
          .pipe(map(data => data.filter(p => p.name.includes(v))))
          .subscribe((data: any) => {
            console.log(data);
          })
      }
    })
  }
  ngOnInit(): void {
    this.cartService.getUnavailableDates();
    this.unavailableDates$ = this.cartService.unavailableDates$;

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
  validate(input_date: Date) {
    if (!this.unavailableDates$) return this.isDateValid = true;
    else {
      this.unavailableDates$.subscribe(
        (data: IUnavailableDate[]) => {
          data.map((date: IUnavailableDate) => {
            const currentDate = new Date(date.date);
            const currentDateInput = new Date(input_date);
            if (getFullDateIsraelString(currentDate) === getFullDateIsraelString(currentDateInput)) return this.isDateValid = false;
            else return this.isDateValid = true
          })
        }
      )
      return
    }
  }
}
export function getFullDateIsraelString(date: Date): string {
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
}