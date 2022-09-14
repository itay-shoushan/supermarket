import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ICheckoutCart, IUnavailableDate } from 'src/app/models/cart.model';
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
  private currentBuyer: IUser;
  public cities: string[] = [];
  public currentDate: Date = new Date;
  public maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1));
  public unavailableDates: IUnavailableDate[] = []
  constructor(private authService: AuthService, private cartService: CartService, private citiesService: CitiesService, private router: Router) {
    this.cities = this.citiesService.cities;
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
        console.log(result);
        if (result?.order_id) {
          alert(`order succeed! your order number is: ${result?.order_id} it will arrive at ${shipping_date}`);
          this.router.navigate(['/home'])
        }
      }).catch((ex: any) => {
        console.log(ex);
        ex?.error?.message ? alert(ex?.error?.message) : alert('somthing went wrong please try again')
      })
    } catch (error) {
      console.log(error);
    }
  }

}
