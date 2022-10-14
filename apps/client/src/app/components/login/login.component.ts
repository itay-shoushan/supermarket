import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
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

  private _userDeails$ = new BehaviorSubject<boolean>(false);
  userDeails$ = this._userDeails$.asObservable();
  public current_role: string = '';
  @Output() isLoggedInEvent = new EventEmitter<boolean>(false);

  constructor(private authService: AuthService, private route: Router) {
    const currentToken = localStorage.getItem("token");
    this._isLoggedIn$.next(!!currentToken);
    this.isLoggedInEvent.emit(!!currentToken);

  }

  ngOnInit(): void {
    if (this.authService.getUserData()) {
      this.current_role = this.authService.getUserData()?.role;
    }
  }
  onLogin(form: NgForm) {
    const currentUser: IUserLogin = {
      email: form?.value?.user_email,
      password: form?.value?.user_password
    }
    this.authService.login(currentUser).subscribe({
      error: (ex: any) => {
        alert(ex?.error?.message)
      },
      next: (result: any) => {
        localStorage.setItem("token", result?.token);
        this._isLoggedIn$.next(true);
        this.isLoggedInEvent.emit(true);
        this.current_role = this.authService.getUserData()?.role;
      },
      complete: () => {
        alert("login succeed");
        this.route.navigate(["home"]);
        window.location.reload();
      }
    })
  }

}
