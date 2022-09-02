import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IUserLogin } from 'src/app/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private authService: AuthService, private route: Router) {
    const currentToken = localStorage.getItem("token");
    console.log(!!currentToken);
    this._isLoggedIn$.next(!!currentToken);
  }

  ngOnInit(): void {
  }
  onLogin(form: NgForm) {
    const currentUser: IUserLogin = {
      email: form?.value?.user_email,
      password: form?.value?.user_password
    }
    this.authService.login(currentUser).subscribe({
      error: (ex: any) => {
        console.log(ex);
        alert(ex?.error?.message)
      },
      next: (result: any) => {
        localStorage.setItem("token", result?.token);
        this._isLoggedIn$.next(true)
      },
      complete: () => {
        alert("login succeed");
        this.route.navigate(["shopping"]);
      }
    })
  }

}
