import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public current_user: string = '';
  public current_role: string = '';
  constructor(private authService: AuthService) {
    const userData = this.authService.getUserData();
    if (userData) {
      this.current_user = userData?.first_name;
      if (userData?.role === 'admin') this.current_role = 'admin'
      else if (userData?.role === 'viewer') this.current_role = 'viewer'
      else this.current_role = '';
    }
  }

  ngOnInit(): void {

  }
  logout(){
    window.localStorage.clear();
    window.location.reload()
  }

}
