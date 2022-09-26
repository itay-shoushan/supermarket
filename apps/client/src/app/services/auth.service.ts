import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserLogin, IUserRegister } from '../models/user.model';
import { parseTokenData } from './auth.service.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverUrl: string = "";

  constructor(private http: HttpClient) {
    this.serverUrl = environment?.server_url;

  }
  login(user: IUserLogin) {
    const loginUrl = `${this.serverUrl}/auth/login`
    return this.http.post(loginUrl, user)
  }
  register(user: IUserRegister) {
    const registerUrl = `${this.serverUrl}/auth/register`
    return this.http.post(registerUrl, user)
  }
  isLoggedIn(): boolean {
    return localStorage.getItem("token") !== null;
  }
  getToken(): string {
    return localStorage.getItem("token") || ''
  }
  isAdmin() {
    const data = parseTokenData();
    if (data?.role === "admin") return true;
    else {
      alert("you dont have access");
      return false
    }
  }
  getUserData() {
    const data = parseTokenData();
    return data
  }
}
