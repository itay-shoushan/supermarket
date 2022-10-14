import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private cities_options:string[] = ['Tel Aviv','Rishon LeZion','Haifa','Jerusalem','Givattaim','Beer Sheva','Yahod','Raanana']
  constructor() { 
    
  }
  get cities(): string[] {
    return this.cities_options
  }
}
