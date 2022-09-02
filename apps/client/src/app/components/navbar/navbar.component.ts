import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // public current_user:string = '';
  @Input() current_user: string = '';
  constructor(private authService: AuthService) { 
    const userData = this.authService.getUserData();
    if (userData) this.current_user = userData?.first_name
  }

  ngOnInit(): void {

  }

}
