import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
interface City {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public cities: City[] = [];
  constructor() {
    this.cities = [
      { value: 'telaviv-0', viewValue: 'Tel Aviv' },
      { value: 'haifa-1', viewValue: 'Haifa' },
      { value: 'rehovot-2', viewValue: 'Rehovot' },
    ]
  }
  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    console.log(form);
  }
  firstSectionValid(form: NgForm): boolean {
    if (
      form.controls['user_id']?.valid &&
      form.controls['user_email']?.valid &&
      form.controls['user_password']?.valid &&
      form.controls['user_verify_password']?.valid &&
      form?.value?.user_password === form?.value?.user_verify_password
    ) return true
    else return false
  }
}
