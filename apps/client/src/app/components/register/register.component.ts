import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public cities: string[] = [];
  constructor(private authService: AuthService, private route: Router, private citiesService: CitiesService) {
    this.cities = this.citiesService.cities;
  }
  ngOnInit(): void {
  }
  onRegister(form: NgForm) {
    if (form.invalid) return alert("please fill all the fields");;
    const { user_id, user_first_name, user_last_name, user_email, user_password, user_verify_password, user_city, user_street } = form?.value;
    if (user_password !== user_verify_password) return alert("password dont match");
    const currentUser: IUserRegister = {
      id: user_id,
      first_name: user_first_name,
      last_name: user_last_name,
      email: user_email,
      password: user_password,
      passwordConfirm: user_verify_password,
      city: user_city,
      street: user_street
    }
    this.authService.register(currentUser).subscribe({
      error: (ex: any) => {
        alert(ex?.error?.message)
      },
      complete: () => {
        alert("register succeed please login");
        this.route.navigate(["home"]);
      }
    })
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
