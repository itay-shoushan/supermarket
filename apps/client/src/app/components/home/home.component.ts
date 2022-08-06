import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isUserLoggedIn: boolean = true;
  public userStatus: number = 2;
  // 0 - first time, 1 - start buying, 2 - continue 
  public numberOfProducts: number = 135;
  public numberOfOrders: number = 30;

  constructor() { }

  ngOnInit(): void {
  }

}
